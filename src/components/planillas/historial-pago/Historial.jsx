import { Col, Empty, Row, Select, Space, Typography } from "antd";
import Search from "antd/es/input/Search";
import { useContext, useEffect, useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { historialLayout } from "../../../data/dataTable";
import { notificacion } from "../../../helpers/mensajes";
import Cargando from "../../cargando/Cargando";
import TablaHistorial from "../../tabla/TablaHistorial";
import { ModalReprogramar } from "./ModalReprogramar";

function Historial() {
	const { updateData, getData } = useContext(CrudContext);

	const [cargando, setCargando] = useState(false);
	const [historial, setHistorial] = useState([]);

	const getHistorial = async () => {
		setCargando(true);
		const route = "pago/historial";
		const response = await getData(route);
		if (response) {
			const filterNull = response.data.filter((item) => item !== null);
			setHistorial(filterNull);
			setCargando(false);
		}
	};

	useEffect(() => {
		getHistorial();
	}, []);

	const handleValidar = async (e) => {
		const route = "pago/validacion";
		const response = await updateData(e, e.destino[0].pago_id, route);
		if (response) {
			notificacion(response.status, response.msg);
			getHistorial();
		}
	};

	const [modalReprogramar, setModalReprogramar] = useState(false);
	const [dataReprogramar, setDataReprogramar] = useState({});

	const handleOpenModalReprogramar = () => {
		setModalReprogramar(true);
	};

	const handleCloseModalReprogramar = () => {
		setModalReprogramar(false);
	};

	const handleReprogramar = (e) => {
		setDataReprogramar(e);
		handleOpenModalReprogramar();
	};

	const columns = historialLayout(handleValidar, handleReprogramar);

	const options = [
		{ value: "1", label: "Pago tipo casa" },
		{ value: "2", label: "Pago tipo incentivo" },
		{ value: "3", label: "Pago tipo asociacion" },
	];
	return (
		<div>
			<Row style={{ width: "100%" }}>
				<Col span={6}>
					<Space
						direction="horizontal"
						style={{
							width: "100%",
							display: "flex",
						}}
					>
						<Typography>Filtrar por:</Typography>
						<Select
							style={{ width: 150 }}
							placeholder="Tipo de pago"
							defaultValue={"1"}
							onChange={options}
							options={options}
						/>
					</Space>
				</Col>
				<Col span={6}>
					<Search
						placeholder="Buscar"
						// onSearch={onSearch}
						style={{
							width: 200,
						}}
					/>
				</Col>
			</Row>
			{historial?.length > 0 ? (
				<TablaHistorial columns={columns} table={historial} />
			) : (
				<>
					{cargando ? (
						<Cargando />
					) : (
						<Empty
							image={Empty.PRESENTED_IMAGE_SIMPLE}
							description={
								<span>No hay registros para mostrar.</span>
							}
						/>
					)}
				</>
			)}
			{modalReprogramar && (
				<ModalReprogramar
					data={dataReprogramar}
					open={modalReprogramar}
					onClose={handleCloseModalReprogramar}
					actualizarTabla={getHistorial}
				/>
			)}
		</div>
	);
}
export default Historial;

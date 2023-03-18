import { Col, Empty, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import { AiOutlineForm } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { extraordinarioLayout } from "../../../data/dataTable";
import { notificacion } from "../../../helpers/mensajes";
import ButtonAdd from "../../Button/ButtonAdd";
import Cargando from "../../cargando/Cargando";
import TablaPagoExtraordinario from "../../tabla/TablaPagoExtraordinario";
import ModalPagoExtraordinario from "./ModalPagoExtraordinario";

function PagoExtraordinario() {
	const { getData, setDataToEdit, modal, setModal, deleteData } =
		useContext(CrudContext);

	const [cargando, setCargando] = useState(false);
	const [pagosExtraordinarios, setPagosExtraordinarios] = useState([]);

	const getPagosExtraordinarios = async () => {
		const route = "ayuda/lista";
		setCargando(true);
		const response = await getData(route);
		if (response) {
			const filterNull = response.data.filter((item) => item !== null);
			setPagosExtraordinarios(filterNull);
			setCargando(false);
		}
	};

	useEffect(() => {
		getPagosExtraordinarios();
	}, []);

	const handleEdit = (e) => {
		setModal(true);
		setDataToEdit(e);
	};

	const handleDelete = async (e) => {
		const response = await deleteData("ayuda", e);
		if (response) {
			notificacion(response.status, response.msg);
			getPagosExtraordinarios();
		}
	};

	const columns = extraordinarioLayout(handleEdit, handleDelete);

	return (
		<>
			<Row align="middle">
				<Col span={18}></Col>
				<Col span={6}>
					<ButtonAdd
						title={"Agregar pago extraordinario"}
						onClick={() => setModal(true)}
						icon={<AiOutlineForm />}
					/>
				</Col>
			</Row>
			{pagosExtraordinarios.length > 0 ? (
				<TablaPagoExtraordinario
					columns={columns}
					table={pagosExtraordinarios}
				/>
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
			{modal && (
				<ModalPagoExtraordinario
					actualizarTabla={getPagosExtraordinarios}
				/>
			)}
		</>
	);
}
export default PagoExtraordinario;

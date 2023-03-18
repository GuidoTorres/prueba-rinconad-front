import { Col, Empty, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import { AiOutlineForm } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import ButtonAdd from "../../Button/ButtonAdd";
import Cargando from "../../cargando/Cargando";
import Header from "../../header/Header";
import { notificacion } from "../../../helpers/mensajes";
import ModalCasa from "./ModalCasa";
import { casaLayout } from "../../../data/dataTable";
import Tabla from "../../tabla/Tabla";

function Casa() {
	const { getData, setDataToEdit, modal, setModal, deleteData } =
		useContext(CrudContext);

	const [cargando, setCargando] = useState(false);

	const [pagosCasa, setPagosCasa] = useState([]);

	const getPagosCasa = async () => {
		const route = "casa";
		const response = await getData(route);
		if (response) {
			const filterNull = response.data.filter((item) => item !== null);
			setPagosCasa(filterNull);
			setCargando(false);
		}
	};

	useEffect(() => {
		getPagosCasa();
	}, []);

	const handleEdit = (e) => {
		setModal(true);
		setDataToEdit(e);
	};

	const handleDelete = async (e) => {
		const response = await deleteData("casa", e);
		if (response) {
			notificacion(response.status, response.msg);
			getPagosCasa();
		}
	};

	const columns = casaLayout(handleEdit, handleDelete);

	return (
		<>
			<Header text={"Pagos Casa"} ruta={"/planilla"} />
			<div className="margenes">
				<Row align="middle">
					<Col span={18}></Col>
					<Col span={6} align="end">
						<ButtonAdd
							title="Crear pago casa"
							onClick={() => setModal(true)}
							icon={<AiOutlineForm />}
						/>
					</Col>
				</Row>
				{pagosCasa?.length > 0 ? (
					<Tabla columns={columns} table={pagosCasa} />
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
			</div>
			{modal && <ModalCasa actualizarTabla={getPagosCasa} />}
		</>
	);
}
export default Casa;

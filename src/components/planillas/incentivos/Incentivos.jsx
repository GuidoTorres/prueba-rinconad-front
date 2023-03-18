import { Col, Empty, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineForm } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { incentivosLayout } from "../../../data/dataTable";
import { notificacion } from "../../../helpers/mensajes";
import ButtonAdd from "../../Button/ButtonAdd";
import Cargando from "../../cargando/Cargando";
import Header from "../../header/Header";
import TablaIncentivos from "../../tabla/TablaIncentivos";
import ModalIncentivo from "./ModalIncentivo";
import ModalJuntarTeletrans from "./ModalJuntarTeletrans";

const Incentivos = () => {
	const { getData, dataToEdit, setDataToEdit, modal, setModal, deleteData } =
		useContext(CrudContext);

	const [cargando, setCargando] = useState(false);

	const [incentivos, setIncentivos] = useState([]);

	const getIncentivos = async () => {
		const response = await getData("incentivo");
		if (response) {
			const filterNull = response.data.filter((item) => item !== null);
			setIncentivos(filterNull);
			setCargando(false);
		}
	};

	const [trabajadores, setTrabajadores] = useState([]);

	const getAllTrabajadores = async () => {
		const response = await getData("incentivo/trabajadores");
		setTrabajadores(response.data);
	};
	useEffect(() => {
		getIncentivos();
		getAllTrabajadores();
	}, []);

	const handleEdit = (e) => {
		if (e.trabajadores.length > 1) {
			handleOpenModalJuntar(true);
		} else {
			setModal(true);
		}
		setDataToEdit(e);
	};

	const handleDelete = async (e) => {
		const response = await deleteData("pago", e);
		if (response) {
			notificacion(response.status, response.msg);
			getIncentivos();
		}
	};

	const columns = incentivosLayout(handleEdit, handleDelete);

	const [modalJuntar, setModalJuntar] = useState(false);

	const handleOpenModalJuntar = () => {
		setModalJuntar(true);
	};

	const handleCloseModalJuntar = () => {
		setModalJuntar(false);
	};

	return (
		<>
			<Header text={"Incentivos"} ruta={"/planilla"} />
			<div className="margenes">
				<Row align="middle">
					<Col span={18}></Col>
					<Col span={6} align="end">
						<ButtonAdd
							title="Crear incentivo"
							onClick={() => setModal(true)}
							icon={<AiOutlineForm />}
						/>
					</Col>
				</Row>
				{incentivos?.length > 0 ? (
					<TablaIncentivos columns={columns} table={incentivos} />
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
			{modal && <ModalIncentivo actualizarTabla={getIncentivos} />}
			{modalJuntar && (
				<ModalJuntarTeletrans
					closeModal={handleCloseModalJuntar}
					open={modalJuntar}
					actualizarTabla={getIncentivos}
					dataToEdit={dataToEdit}
					setDataToEdit={setDataToEdit}
					trabajadores={trabajadores}
				/>
			)}
		</>
	);
};

export default Incentivos;

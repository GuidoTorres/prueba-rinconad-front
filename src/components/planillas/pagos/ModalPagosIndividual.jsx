import { Button, Form, Space } from "antd";
import { useContext, useEffect, useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { incentivoValues } from "../../../data/initalValues";
import MainModal from "../../modal/MainModal";
import { notificacion } from "../../../helpers/mensajes";
import { AiOutlineForm, AiOutlineTeam } from "react-icons/ai";
import dayjs from "dayjs";
import ModalJuntarTeletrans from "./ModalJuntarTeletrans";
import ButtonAdd from "../../Button/ButtonAdd";

function ModalPagosIndividual({ open, closeModal, actualizarTabla }) {
	const [form] = Form.useForm();

	const {
		createData,
		getData,
		cargando,
		setCargando,
		setDataToEdit,
		dataToEdit,
		updateData,
	} = useContext(CrudContext);

	// const [incentivo, setIncentivo] = useState(incentivoValues);
	// const [trabajadores, setTrabajadores] = useState([]);

	// const getAllTrabajadores = async () => {
	// 	const response = await getData("incentivo/trabajadores");
	// 	setTrabajadores(response.data);
	// };

	// useEffect(() => {
	// 	getAllTrabajadores();
	// }, []);

	// useEffect(() => {
	// 	if (dataToEdit) {
	// 		setIncentivo({
	// 			...dataToEdit,
	// 			nombre: dataToEdit.trabajadores[0].nombre,
	// 			teletrans: parseFloat(dataToEdit.trabajadores[0].teletrans),
	// 			observacion: dataToEdit.observacion,
	// 			fecha_pago: dayjs(dataToEdit.fecha_pago).format("YYYY-MM-DD"),
	// 		});
	// 		form.setFieldsValue({
	// 			...dataToEdit,
	// 			nombre: dataToEdit.trabajadores[0].nombre,
	// 			teletrans: parseFloat(dataToEdit.trabajadores[0].teletrans),
	// 			observacion: dataToEdit.observacion,
	// 			fecha_pago: dayjs(dataToEdit.fecha_pago).format("YYYY-MM-DD"),
	// 		});
	// 	} else {
	// 		setIncentivo(incentivoValues);
	// 	}
	// }, [dataToEdit]);

	// const handleData = (e, text) => {
	// 	if (!text && e.target) {
	// 		const { name, value } = e.target;
	// 		form.setFieldsValue({
	// 			[name]: value,
	// 		});
	// 		setIncentivo((values) => {
	// 			return { ...values, [name]: value };
	// 		});
	// 	} else {
	// 		form.setFieldsValue({
	// 			[text]: e,
	// 		});
	// 		setIncentivo((values) => {
	// 			return { ...values, [text]: e };
	// 		});
	// 	}
	// };

	// const handleSubmit = async () => {
	// 	const route = "pago/programacion";
	// 	setCargando(true);
	// 	const incentivoData = {
	// 		contrato_id: incentivo.contrato_id || "",
	// 		observacion: incentivo.observacion || "",
	// 		fecha_pago: dayjs(incentivo.fecha_pago).format("YYYY-MM-DD") || "",
	// 		teletrans: parseFloat(incentivo.teletrans) || 0,
	// 		tipo: incentivo.tipo || "incentivo",
	// 	};
	// 	if (dataToEdit) {
	// 		const response = await updateData(
	// 			incentivoData,
	// 			dataToEdit.pago_id,
	// 			"pago"
	// 		);
	// 		if (response) {
	// 			notificacion(response.status, response.msg);
	// 			actualizarTabla();
	// 			closeModalPago();
	// 		}
	// 	} else {
	// 		const response = await createData(incentivoData, route);
	// 		if (response) {
	// 			notificacion(response.status, response.msg);
	// 			actualizarTabla();
	// 			closeModalPago();
	// 		}
	// 	}
	// };
	const closeModalPago = () => {
		closeModal(false);
		setDataToEdit(null);
		setCargando(false);
		// setIncentivo(incentivoValues);
	};

	// const formData = ModalPagosIndividual(
	// 	incentivo,
	// 	handleData,
	// 	trabajadores,
	// 	dataToEdit
	// );

	const [modalTeletrans, setModalTeletrans] = useState(false);
	const handleOpenModalTeletrans = () => {
		setModalTeletrans(true);
	};

	const handlecloseModalPagoTeletrans = () => {
		setModalTeletrans(false);
	};

	return (
		<>
			<MainModal
				className={"modal-usuario"}
				title={dataToEdit ? "Editar Pago" : "Registrar Pago"}
				open={open}
				width={400}
				closeModal={closeModal}
			>
				{!dataToEdit && (
					<Space
						direction="horizontal"
						style={{ width: "100%", justifyContent: "end" }}
					>
						<ButtonAdd
							title="Juntar Teletrans"
							onClick={handleOpenModalTeletrans}
							icon={<AiOutlineTeam />}
						/>
					</Space>
				)}
				{/* <Form
					form={form}
					className="modal-body"
					onFinish={handleSubmit}
					layout="horizontal"
				>
					{formData.map((item, i) => (
						<Form.Item
							className={item.className}
							key={i}
							name={item.name}
							rules={item.rules}
							style={{ marginBottom: "8px" }}
						>
							<>
								{item.label}
								{item.type}
							</>
						</Form.Item>
					))}

					<Form.Item className="button-container">
						<Button
							htmlType="submit"
							icon={<AiOutlineForm />}
							loading={cargando ? true : false}
						>
							{dataToEdit ? "Editar" : "Registrar"}
						</Button>
					</Form.Item>
				</Form> */}
			</MainModal>
			{/* {modalTeletrans && (
				<ModalJuntarTeletrans
					open={modalTeletrans}
					closeModalPago={handlecloseModalPagoTeletrans}
					trabajadores={trabajadores}
					actualizarTabla={actualizarTabla}
					closeModalPagoSubmit={closeModalPago}
				/>
			)} */}
		</>
	);
}
export default ModalPagosIndividual;

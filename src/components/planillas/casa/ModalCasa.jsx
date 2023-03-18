import { Button, Form } from "antd";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { modalCasa } from "../../../data/FormValues";
import { casaValues } from "../../../data/initalValues";
import { notificacion } from "../../../helpers/mensajes";
import MainModal from "../../modal/MainModal";

function ModalCasa({ actualizarTabla }) {
	const [form] = Form.useForm();

	const {
		createData,
		getData,
		modal,
		setModal,
		cargando,
		setCargando,
		setDataToEdit,
		dataToEdit,
		updateData,
	} = useContext(CrudContext);

	const [casa, setCasa] = useState(casaValues);

	const [empresas, setEmpresas] = useState([]);

	const getAllEmpresas = async () => {
		const response = await getData("empresa");
		setEmpresas(response.data);
	};

	useEffect(() => {
		getAllEmpresas();
	}, []);

	useEffect(() => {
		if (dataToEdit) {
			setCasa({
				...dataToEdit,
				razon_social: dataToEdit.razon_social,
				contrato_id: dataToEdit.contrato_id,
				teletrans: parseFloat(dataToEdit.pago?.teletrans),
				volquetes: parseFloat(dataToEdit.pago?.volquetes),
				observacion: dataToEdit.pago?.observacion,
				fecha_pago: dayjs(dataToEdit.pago?.fecha_pago).format(
					"YYYY-MM-DD"
				),
			});
			form.setFieldsValue({
				...dataToEdit,
				razon_social: dataToEdit.razon_social,
				contrato_id: dataToEdit.contrato_id,
				teletrans: parseFloat(dataToEdit.pago?.teletrans),
				volquetes: parseFloat(dataToEdit.pago?.volquetes),
				observacion: dataToEdit.pago?.observacion,
				fecha_pago: dayjs(dataToEdit.pago?.fecha_pago).format(
					"YYYY-MM-DD"
				),
			});
		} else {
			setCasa(casaValues);
		}
	}, [dataToEdit]);

	const handleData = (e, text) => {
		if (!text && e.target) {
			const { name, value } = e.target;
			form.setFieldsValue({
				[name]: value,
			});
			setCasa((values) => {
				return { ...values, [name]: value };
			});
		} else {
			form.setFieldsValue({
				[text]: e,
			});
			setCasa((values) => {
				return { ...values, [text]: e };
			});
		}
	};

	const handleSubmit = async () => {
		const route = "casa/programacion";
		setCargando(true);
		const data = {
			contrato_id: casa.contrato_id || "",
			observacion: casa.observacion || "",
			fecha_pago: dayjs(casa.fecha_pago).format("YYYY-MM-DD") || "",
			teletrans: parseFloat(casa.teletrans) || 0,
			volquetes: parseFloat(casa.volquetes) || 0,
			tipo: "casa",
		};
		// console.log("🚀 ~ file: ModalCasa.jsx:98 ~ handleSubmit ~ data:", data);
		if (dataToEdit) {
			const response = await updateData(
				data,
				dataToEdit.pago?.id,
				"casa/programacion"
			);
			if (response) {
				notificacion(response.status, response.msg);
				actualizarTabla();
				closeModal();
			}
		} else {
			const response = await createData(data, route);
			if (response) {
				notificacion(response.status, response.msg);
				actualizarTabla();
				closeModal();
			}
		}
	};

	const closeModal = () => {
		setCasa(casaValues);
		setModal(false);
		setDataToEdit(null);
		setCargando(false);
	};

	const formData = modalCasa(casa, handleData, empresas, dataToEdit);

	return (
		<>
			<MainModal
				className={"modal-usuario"}
				title={dataToEdit ? "Editar Pago Casa" : "Nueva Pago Casa"}
				open={modal}
				width={400}
				closeModal={closeModal}
			>
				<Form
					form={form}
					className="modal-body"
					onFinish={handleSubmit}
					layout="horizontal"
				>
					{formData.map((item, index) => (
						<Form.Item
							key={index}
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
							icon={<AiOutlineSave />}
							loading={cargando}
						>
							{dataToEdit ? "Actualizar" : "Guardar"}
						</Button>
					</Form.Item>
				</Form>
			</MainModal>
		</>
	);
}
export default ModalCasa;

import {
	Badge,
	Button,
	Card,
	ConfigProvider,
	Form,
	Input,
	Select,
	TimePicker,
} from "antd";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { AiOutlineForm } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { modalPagoExtraordinario } from "../../../data/FormValues";
import {
	pagoExtraordinarioValues,
	pagoValues,
} from "../../../data/initalValues";
import { notificacion } from "../../../helpers/mensajes";
import MainModal from "../../modal/MainModal";
import locale from "antd/es/date-picker/locale/es_ES";

function ModalPagoExtraordinario({ actualizarTabla }) {
	const [form] = Form.useForm();

	const {
		createData,
		getData,
		modal,
		setModal,
		setDataToEdit,
		dataToEdit,
		updateData,
	} = useContext(CrudContext);

	const [cargando, setCargando] = useState(false);

	const [pagoAyuda, setPagoAyuda] = useState(pagoExtraordinarioValues);
	const [trabajadores, setTrabajadores] = useState([]);
	const [conductores, setConductores] = useState([]);
	const [trapiches, setTrapiches] = useState([]);
	const [volquetes, setVolquetes] = useState([]);

	const getConductores = async () => {
		const response = await getData("volquete");
		if (response) {
			const filterNull = response.data.filter((item) => item !== null);
			setConductores(filterNull);
		}
	};

	const getTrapiches = async () => {
		const response = await getData("trapiche");
		if (response) {
			const filterNull = response.data.filter((item) => item !== null);
			setTrapiches(filterNull);
		}
	};

	const getAllTrabajadores = async () => {
		const response = await getData("ayuda");
		setTrabajadores(response.data);
	};

	const [dataConductores, setDataConductores] = useState([]);
	const [dataTrapiches, setDataTrapiches] = useState([]);

	const getDataConductores = () => {
		const data = conductores.map((item) => {
			return {
				value: item.propietario,
				label: item.propietario,
			};
		});
		setDataConductores(data);
	};

	const getDataTrapiches = () => {
		const data = trapiches.map((item) => {
			return {
				value: item.nombre,
				label: item.nombre,
			};
		});
		setDataTrapiches(data);
	};

	useEffect(() => {
		getAllTrabajadores();
		getConductores();
		getTrapiches();
	}, []);

	useEffect(() => {
		getDataConductores();
		getDataTrapiches();
	}, [conductores, trapiches]);

	// const dataConductores = conductores.map((item) => {
	// 	return {
	// 		value: item.propietario,
	// 		label: item.propietario,
	// 	};
	// });

	// const dataTrapiches = trapiches.map((item) => {
	// 	return {
	// 		value: item.nombre,
	// 		label: item.nombre,
	// 	};
	// });

	useEffect(() => {
		let arreglo = [];
		for (let index = 0; index < parseFloat(pagoAyuda.volquetes); index++) {
			arreglo.push({ index, ...pagoValues() });
		}
		setVolquetes(arreglo);

		getDataConductores();
		getDataTrapiches();
	}, [pagoAyuda.volquetes]);

	useEffect(() => {
		if (dataToEdit) {
			setPagoAyuda({
				...dataToEdit,
				nombre: dataToEdit.trabajador.nombre,
				teletrans: parseFloat(dataToEdit.teletrans),
				volquetes: parseFloat(dataToEdit.pago.volquetes) || 0,
				observacion: dataToEdit.pago.observacion,
				fecha_pago: dayjs(dataToEdit.pago.fecha_pago).format(
					"YYYY-MM-DD"
				),
			});
			form.setFieldsValue({
				...dataToEdit,
				nombre: dataToEdit.trabajador.nombre,
				teletrans: parseFloat(dataToEdit.teletrans),
				volquetes: parseFloat(dataToEdit.pago.volquetes) || 0,
				observacion: dataToEdit.pago.observacion,
				fecha_pago: dayjs(dataToEdit.pago.fecha_pago).format(
					"YYYY-MM-DD"
				),
			});

			const volquetes = dataToEdit.pago.destino_pagos.map((item) => {
				return {
					hora: item.destino.hora,
					placa: item.destino.placa,
					propietario: item.destino.propietario,
					trapiche: item.destino.trapiche,
				};
			});
			setVolquetes(volquetes);
		} else {
			setPagoAyuda(pagoExtraordinarioValues);
		}
	}, [dataToEdit]);

	const handleData = (e, text) => {
		if (!text && e.target) {
			const { name, value } = e.target;
			form.setFieldsValue({
				[name]: value,
			});
			setPagoAyuda((values) => {
				return { ...values, [name]: value };
			});
		} else {
			form.setFieldsValue({
				[text]: e,
			});
			setPagoAyuda((values) => {
				return { ...values, [text]: e };
			});
		}
	};

	const handleDataVolquetes = (index, e, text) => {
		setVolquetes((prev) => {
			return prev.map((item) => {
				if (item.index === index) {
					return { ...item, [text]: e };
				} else {
					return item;
				}
			});
		});
	};

	const handleSubmit = async () => {
		const route = "ayuda/pago";
		setCargando(true);

		const destinos = volquetes.map((item) => {
			return {
				hora: dayjs(item.hora).format("HH:mm"),
				placa: item.placa || "",
				propietario: item.propietario || "",
				trapiche: item.trapiche || "",
				teletrans: 4,
			};
		});

		const data = {
			volquetes: parseFloat(pagoAyuda.volquetes) || 0,
			teletrans: parseFloat(pagoAyuda.teletrans) || 0,
			trabajador_dni: pagoAyuda.trabajador_dni || "",
			observacion: pagoAyuda.observacion || "",
			fecha_pago: dayjs(pagoAyuda.fecha_pago).format("YYYY-MM-DD") || "",
			tipo: pagoAyuda.tipo || "extraordinario",
			destino: destinos,
		};

		if (dataToEdit) {
			const response = await updateData(data, dataToEdit.pago_id, "pago");
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
		setModal(false);
		setDataToEdit(null);
		setCargando(false);
		setPagoAyuda(pagoExtraordinarioValues);
	};

	const formData = modalPagoExtraordinario(
		pagoAyuda,
		handleData,
		trabajadores,
		dataToEdit
	);

	return (
		<>
			<MainModal
				className={"modal-usuario"}
				title={
					dataToEdit
						? "Editar pago extraordinario"
						: "Registrar pago extraordinario"
				}
				open={modal}
				width={400}
				closeModal={closeModal}
			>
				<Form
					form={form}
					className="modal-body"
					onFinish={handleSubmit}
					layout="vertical"
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
					{volquetes.map((item, i) => (
						<Badge.Ribbon key={i} text={`Vehículo ${i + 1}`}>
							<Card style={{ width: "100%" }}>
								<Form.Item
									name={`conductor${i}`}
									label="Propietario"
									rules={[
										{
											required: true,
											message: "Ingrese el propietario",
										},
									]}
								>
									<Select
										showSearch
										placeholder="Propietario"
										style={{
											width: "100%",
										}}
										onChange={(e) => {
											const propietario =
												conductores.find(
													(item) =>
														item.propietario === e
												);
											handleDataVolquetes(
												item.index,
												propietario.placa,
												"placa"
											);
											handleDataVolquetes(
												item.index,
												propietario.propietario,
												"propietario"
											);
										}}
										value={item.propietario}
										filterOption={(input, option) =>
											(option?.label ?? "")
												.toLowerCase()
												.includes(input.toLowerCase())
										}
										options={dataConductores}
									/>
								</Form.Item>
								<Form.Item
									label="Placa"
									rules={[
										{
											required: true,
											message: "Campo obligatorio",
										},
									]}
								>
									<Input
										placeholder="Placa"
										value={item.placa}
										readOnly
									/>
								</Form.Item>
								<Form.Item
									name={`trapiche${i}`}
									label="Trapiche"
									rules={[
										{
											required: true,
											message: "Ingrese el trapiche",
										},
									]}
								>
									<Select
										showSearch
										placeholder="Trapiche"
										style={{
											width: "100%",
										}}
										name="trapiche"
										onChange={(e) => {
											const trapiche = trapiches.find(
												(item) => item.nombre === e
											);
											handleDataVolquetes(
												item.index,
												trapiche.nombre,
												"trapiche"
											);
										}}
										value={item.trapiche}
										filterOption={(input, option) =>
											(option?.label ?? "")
												.toLowerCase()
												.includes(input.toLowerCase())
										}
										options={dataTrapiches}
									/>
								</Form.Item>
								<Form.Item name={`hora${i}`} label="Hora">
									<ConfigProvider locale={locale}>
										<TimePicker
											name="hora"
											allowClear={false}
											format="HH:mm"
											style={{ width: "100%" }}
											onChange={(e) => {
												handleDataVolquetes(
													item.index,
													e,
													"hora"
												);
											}}
											value={dayjs(item.hora)}
										/>
									</ConfigProvider>
								</Form.Item>
							</Card>
						</Badge.Ribbon>
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
				</Form>
			</MainModal>
		</>
	);
}
export default ModalPagoExtraordinario;

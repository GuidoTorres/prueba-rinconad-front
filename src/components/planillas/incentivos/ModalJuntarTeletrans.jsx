import {
	Alert,
	Button,
	Card,
	Col,
	ConfigProvider,
	DatePicker,
	Divider,
	Form,
	Input,
	List,
	Row,
	Select,
	Space,
	Typography,
} from "antd";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import locale from "antd/es/date-picker/locale/es_ES";
import { incentivosVariosValues } from "../../../data/initalValues";
import MainModal from "../../modal/MainModal";
import { AiOutlineForm } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { notificacion } from "../../../helpers/mensajes";

function ModalJuntarTeletrans({
	open,
	closeModal,
	trabajadores,
	actualizarTabla,
	closeModalSubmit = () => {},
	dataToEdit,
	setDataToEdit = () => {},
}) {
	const [form] = Form.useForm();
	const { Text } = Typography;

	const { updateData, createData, cargando, setCargando } =
		useContext(CrudContext);

	const dataTrabajadores = trabajadores.map((item) => {
		return {
			value: item.contrato_id,
			label: item.nombre,
		};
	});

	const [seleccionados, setSeleccionados] = useState([]);

	const handleChange = (e) => {
		setSeleccionados(e);
	};

	const [trabajadoresSeleccionados, setTrabajadoresSeleccionados] = useState(
		[]
	);

	useEffect(() => {
		if (seleccionados.length > 0) {
			const data = trabajadores.filter((item) =>
				seleccionados.includes(item.contrato_id)
			);
			setTrabajadoresSeleccionados(data);
		}
	}, [seleccionados]);

	const [incentivo, setIncentivo] = useState(incentivosVariosValues);

	const handleData = (e, text) => {
		if (!text && e.target) {
			const { name, value } = e.target;
			form.setFieldsValue({
				[name]: value,
			});
			setIncentivo((values) => {
				return { ...values, [name]: value };
			});
		} else {
			form.setFieldsValue({
				[text]: e,
			});
			setIncentivo((values) => {
				return { ...values, [text]: e };
			});
		}
	};

	const [trabajadoresSave, setTrabajadoresSave] = useState([]);
	useEffect(() => {
		if (trabajadoresSeleccionados.length > 0) {
			const data = trabajadoresSeleccionados.map((item) => {
				return {
					nombre: item.nombre,
					contrato_id: item.contrato_id,
					teletrans: item.teletrans || "",
				};
			});
			if (dataToEdit) {
				setTrabajadoresSave(
					incentivo.trabajadores.map((item) => {
						return {
							...item,
							teletrans: parseFloat(item.teletrans),
						};
					})
				);
			} else {
				setTrabajadoresSave(data);
			}
		}
	}, [trabajadoresSeleccionados]);

	const handleDataTrabajador = (e, id) => {
		const index = trabajadoresSave.findIndex(
			(item) => item.contrato_id === id
		);
		trabajadoresSave[index] = {
			...trabajadoresSave[index],
			teletrans: parseFloat(e.target.value),
		};
		setTrabajadoresSave([...trabajadoresSave]);
	};

	const totalTeletrans = () => {
		let total = 0;
		trabajadoresSave.forEach((item) => {
			total += item.teletrans;
		});
		return total;
	};

	const handleSubmit = async () => {
		const route = "pago/programacion/multiple";

		setCargando(true);
		const data = {
			observacion: incentivo.observacion,
			fecha_pago: dayjs(incentivo.fecha_pago).format("YYYY-MM-DD") || "",
			teletrans: totalTeletrans(),
			tipo: "incentivo",
			trabajadores: trabajadoresSave.map((item) => {
				return {
					contrato_id: item.contrato_id,
					teletrans: item.teletrans,
				};
			}),
		};
		if (dataToEdit) {
			const response = await updateData(
				data,
				incentivo.pago_id,
				"pago/multiple"
			);
			if (response) {
				notificacion(response.status, response.msg);
				actualizarTabla();
				handleClose();
			}
		} else {
			const response = await createData(data, route);
			if (response) {
				notificacion(response.status, response.msg);
				actualizarTabla();
				handleClose();
			}
		}
	};

	useEffect(() => {
		if (dataToEdit) {
			setIncentivo({
				...dataToEdit,
				fecha_pago: dayjs(dataToEdit.fecha_pago).format("YYYY-MM-DD"),
			});
			setSeleccionados(
				dataToEdit.trabajadores.map((item) => item.contrato_id)
			);
			setTrabajadoresSave(dataToEdit.trabajadores);
		}
	}, [dataToEdit]);

	const handleClose = () => {
		setDataToEdit(null);
		closeModal();
		closeModalSubmit();
	};

	return (
		<MainModal
			open={open}
			closeModal={dataToEdit ? handleClose : closeModal}
			title="Juntar Teletrans"
			width={800}
		>
			<Form
				form={form}
				className="modal-body"
				onFinish={handleSubmit}
				layout="vertical"
			>
				<Divider orientation="left">Datos</Divider>
				<Space direction="vertical" style={{ width: "100%" }}>
					<Form.Item label="Seleccione trabajadores">
						<Select
							mode="multiple"
							placeholder="Seleccione trabajadores"
							style={{ width: "100%" }}
							allowClear
							onChange={handleChange}
							options={dataTrabajadores}
							disabled={dataToEdit ? true : false}
						/>
					</Form.Item>
					<Form.Item label="Observación">
						<Input
							name="observacion"
							value={incentivo.observacion}
							placeholder="Observación"
							onChange={(e) => handleData(e)}
						/>
					</Form.Item>
					<Form.Item label="Fecha">
						<ConfigProvider locale={locale}>
							<DatePicker
								allowClear={false}
								value={dayjs(incentivo.fecha_pago)}
								name="fecha_pago"
								placeholder="Fecha de Pago"
								picker="day"
								onChange={(e) => handleData(e, "fecha_pago")}
								style={{
									width: "100%",
								}}
								format={"YYYY-MM-DD"}
							/>
						</ConfigProvider>
					</Form.Item>
				</Space>
				<Divider orientation="left">Trabajadores</Divider>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 4,
					}}
				>
					<Card style={{ width: "100%" }}>
						<List
							itemLayout="horizontal"
							dataSource={trabajadoresSave}
							renderItem={(item) => (
								<List.Item>
									<Row
										key={item.contrato_id}
										style={{ width: "100%" }}
									>
										<Col span={18}>
											<Space direction="vertical">
												{item.nombre}
											</Space>
										</Col>
										<Col span={6}>
											<Space direction="vertical">
												<Input
													value={item.teletrans}
													placeholder="Teletrans"
													type="number"
													min={0}
													onChange={(e) =>
														handleDataTrabajador(
															e,
															item.contrato_id
														)
													}
													required
												/>
											</Space>
										</Col>
									</Row>
								</List.Item>
							)}
						/>
						<Space
							direction="horizontal"
							style={{
								width: "100%",
								justifyContent: "end",
								alignItems: "center",
								padding: 24,
							}}
						>
							<Text
								type={
									totalTeletrans() % 4 === 0
										? "success"
										: "danger"
								}
							>
								TOTAL DE TELETRANS
							</Text>
							<Alert
								message={totalTeletrans()}
								type={
									totalTeletrans() % 4 === 0
										? "success"
										: "error"
								}
							/>
						</Space>
					</Card>
				</div>
				<Space
					direction="horizontal"
					style={{
						width: "100%",
						marginTop: 20,
						justifyContent: "end",
					}}
				>
					<Button onClick={closeModal}>Cancelar</Button>
					<Button
						type="primary"
						htmlType="submit"
						icon={<AiOutlineForm />}
						loading={cargando ? true : false}
					>
						{/* {dataToEdit ? "Editar" : "Registrar"} */}
						Registrar
					</Button>
				</Space>
			</Form>
		</MainModal>
	);
}
export default ModalJuntarTeletrans;

import {
	Badge,
	Button,
	Card,
	Col,
	ConfigProvider,
	Divider,
	Form,
	Input,
	Row,
	Select,
	Space,
	Tag,
	TimePicker,
	Typography,
} from "antd";
import locale from "antd/es/date-picker/locale/es_ES";
import dayjs from "dayjs";
import { Fragment, useContext, useEffect, useState } from "react";
import { AiOutlineForm } from "react-icons/ai";
import { BsCalendar2Check } from "react-icons/bs";
import { CrudContext } from "../../../context/CrudContext";
import { pagoValues } from "../../../data/initalValues";
import { notificacion } from "../../../helpers/mensajes";
import VisualizadorPdf from "./VisualizadorPdf";
import MainModal from "../../modal/MainModal";
import "../style/modalPagos.css";
const ModalPago = ({
	open,
	closeModal,
	data = {},
	actualizarTabla,
	closeModalTablaPagos,
}) => {
	const { Text } = Typography;
	const [form] = Form.useForm();

	const [volquetes, setVolquetes] = useState([]);

	useEffect(() => {
		if (data?.asociacion[0]?.teletrans !== null) {
			let arreglo = [];
			for (
				let index = 0;
				index < parseFloat(data?.asociacion[0]?.teletrans) / 4;
				index++
			) {
				arreglo.push({ index, ...pagoValues() });
			}
			setVolquetes(arreglo);
		}
	}, [data]);

	const { getData, createData } = useContext(CrudContext);

	const [cargando, setCargando] = useState(false);

	const [conductores, setConductores] = useState([]);
	const [trapiches, setTrapiches] = useState([]);

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

	useEffect(() => {
		getConductores();
		getTrapiches();
	}, []);

	const handleData = (index, e, text) => {
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
		const route = "casa/pago";
		setCargando(true);
		const destinos = volquetes.map((item) => {
			return {
				hora: dayjs(item.hora).format("HH:mm"),
				placa: item.placa || "",
				propietario: item.propietario || "",
				trapiche: item.trapiche || "",
				volquetes: 1,
				teletrans: 4,
			};
		});

		const dataSave = {
			pago_id: data?.asociacion[0]?.pago_id,
			volquetes: volquetes.length,
			destino: destinos,
		};

		const response = await createData(dataSave, route);
		if (response) {
			notificacion(response.status, response.msg);
			actualizarTabla();
			closeModal();
			closeModalTablaPagos();
			// handleImprimir();
		}
	};

	const dataConductores = conductores.map((item) => {
		return {
			value: item.propietario,
			label: item.propietario,
		};
	});

	const dataTrapiches = trapiches.map((item) => {
		return {
			value: item.nombre,
			label: item.nombre,
		};
	});

	const handleImprimir = () => {
		window.open("imprimir", "_blank");
	};

	return (
		<>
			<MainModal
				className={"modal-pago"}
				title={"Generar pago"}
				open={open}
				width={800}
				closeModal={closeModal}
			>
				<Card
					style={{
						width: "100%",
					}}
				>
					<Row justify="space-between">
						<Col span={8}>
							<Space direction="horizontal">
								<BsCalendar2Check />
								<Text>{data?.fecha_pago}</Text>
							</Space>
						</Col>
						<Col span={8}>
							<Space direction="horizontal">
								<Text>Tipo:</Text>
								{data?.tipo === "casa" ? (
									<Tag color="green">Casa</Tag>
								) : data?.tipo === "incentivo" ? (
									<Tag color="gold">Incentivo</Tag>
								) : data?.tipo === "asociacion" ? (
									<Tag color="purple">Asociación</Tag>
								) : (
									""
								)}
							</Space>
						</Col>
						<Col span={24}>
							<Text strong>Observación: </Text>
							<Text>{data?.observacion}</Text>
						</Col>
					</Row>
				</Card>
				<Card style={{ width: "100%" }}>
					{data?.asociacion?.map((item, i) => {
						return (
							<Fragment key={i}>
								<Row justify="space-between">
									<Col span={12}>
										<Space direction="horizontal">
											<Text strong>Nombre:</Text>
											<Text>{item?.nombre}</Text>
										</Space>
									</Col>
									<Col span={12}>
										<Space direction="horizontal">
											<Text strong>Dni:</Text>
											<Text>{item?.dni}</Text>
										</Space>
									</Col>
									<Col span={12}>
										<Space direction="horizontal">
											<Text strong>Celular:</Text>
											<Text>{item?.celular}</Text>
										</Space>
									</Col>
									<Col span={12}>
										<Space direction="horizontal">
											<Text strong>Cargo:</Text>
											<Text>{item?.cargo}</Text>
										</Space>
									</Col>
									<Col span={12}>
										<Space direction="horizontal">
											<Text strong>Area:</Text>
											<Text>{item?.area}</Text>
										</Space>
									</Col>
									<Col span={12}>
										<Space direction="horizontal">
											<Text strong>Pago:</Text>
											<Text>{item?.teletrans}</Text>
										</Space>
									</Col>
								</Row>
								{data?.asociacion?.length !== i + 1 && (
									<Divider />
								)}
							</Fragment>
						);
					})}
				</Card>
				<Divider orientation="left">Vehículo/s</Divider>
				<Form
					form={form}
					layout="vertical"
					name="form_in_modal"
					onFinish={handleSubmit}
				>
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
											handleData(
												item.index,
												propietario.placa,
												"placa"
											);
											handleData(
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
								<Form.Item label="Placa">
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
											handleData(
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
												handleData(
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
						{/* <Button type="primary" onClick={handleImprimir}>
							imprimir
						</Button> */}
						<Button
							htmlType="submit"
							icon={<AiOutlineForm />}
							loading={cargando}
						>
							Realizar Pago
						</Button>
					</Form.Item>
				</Form>
			</MainModal>
		</>
	);
};

export default ModalPago;

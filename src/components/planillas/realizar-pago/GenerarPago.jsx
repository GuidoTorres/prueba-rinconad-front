import { Badge, Calendar } from "antd";
import React, { useContext, useState } from "react";
import Header from "../../header/Header";
import dayjs from "dayjs";
import { CrudContext } from "../../../context/CrudContext";
import ModalRealizarPago from "./ModalRealizarPago";

const GenerarPago = () => {
	const { getData, setModal, modal } = useContext(CrudContext);
	const [fechaPago, setFechaPago] = useState("");
	const [data, setData] = useState([]);

	const getFechaPago = async (fecha) => {
		const route = `pago?fecha=${fecha}`;
		const response = await getData(route);

		if (response.data.length > 0) {
			setData(response.data);
			setModal(true);
		}
	};

	const onSelect = async (e) => {
		const fecha = dayjs(e).format("YYYY-MM-DD");
		setFechaPago(fecha);

		getFechaPago(fecha);
	};

	const getPagosData = (value) => {
		let listData;
		switch (value.date()) {
			case 8:
				listData = [
					{
						type: "success",
						content: "This is usual event.",
					},
				];
				break;
			case 10:
				listData = [
					{
						type: "success",
						content: "This is usual event.",
					},
				];
				break;
			case 15:
				listData = [
					{
						type: "success",
						content: "This is usual event.",
					},
				];
				break;
			default:
		}
		return listData || [];
	};

	const dataCellRender = (value) => {
		const listData = getPagosData(value);
		return (
			<ul className="events">
				{listData.map((item) => (
					<li key={item.content}>
						<Badge status={item.type} text={item.content} />
						{item.content}
					</li>
				))}
			</ul>
		);
	};

	return (
		<>
			<Header text={"Realizar pagos"} ruta={"/planilla"} />
			<div className="margenes">
				<Calendar
					fullscreen={true}
					onSelect={onSelect}
					// dateCellRender={dataCellRender}
				/>
			</div>
			{modal && (
				<ModalRealizarPago
					fecha={fechaPago}
					data={data}
					actualizarTabla={getFechaPago}
				/>
			)}
		</>
	);
};

export default GenerarPago;

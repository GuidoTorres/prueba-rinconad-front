import { Tabs } from "antd";
import Header from "../../header/Header";
import Historial from "./Historial";
import PagoExtraordinario from "./PagoExtraordinario";

const HistorialPagos = () => {
	const items = [
		{
			key: "1",
			label: "Historial",
			children: <Historial />,
		},
		{
			key: "2",
			label: "Pagos extraordinarios",
			children: <PagoExtraordinario />,
		},
	];

	return (
		<>
			<Header text={"Historial de pagos"} ruta={"/planilla"} />
			<div className="margenes">
				<Tabs defaultActiveKey="1" items={items} />
			</div>
		</>
	);
};

export default HistorialPagos;

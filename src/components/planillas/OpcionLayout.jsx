import React from "react";
import "../administracion/styles/opcionUsuario.css";
import "./style/opcionesLayout.css";
import MenuOpcion from "../menu-opciones/MenuOpcion";
import { BsCalendarWeek, BsListOl, BsWallet2 } from "react-icons/bs";

const OpcionLayout = () => {
	const asistencia = JSON.parse(
		localStorage.getItem("permisos")
	).planillas_asistencia;
	const control = JSON.parse(
		localStorage.getItem("permisos")
	).planillas_control;
	return (
		<div className="opciones">
			<div>
				{asistencia ? (
					<MenuOpcion
						text={"Listas de asistencia"}
						path={"asistencia"}
						img={<BsCalendarWeek className="icon" />}
					/>
				) : (
					""
				)}
				{control ? (
					<MenuOpcion
						text={"Planillas"}
						path={"control"}
						img={<BsListOl className="icon" />}
					/>
				) : (
					""
				)}
				<MenuOpcion
					text={"Programación de pagos"}
					path={"pagos"}
					img={<BsWallet2 className="icon" />}
				/>
				<MenuOpcion
					text={"Realizar pagos"}
					path={"pagos/generar"}
					img={<BsWallet2 className="icon" />}
				/>
				<MenuOpcion
					text={"Historial de pagos"}
					path={"pagos/historial"}
					img={<BsWallet2 className="icon" />}
				/>
				<MenuOpcion
					text={"Incentivos"}
					path={"pagos/incentivos"}
					img={<BsWallet2 className="icon" />}
				/>
				<MenuOpcion
					text={"Casa"}
					path={"pagos/casa"}
					img={<BsWallet2 className="icon" />}
				/>
				<MenuOpcion
					text={"Asociacion"}
					path={"pagos/casa"}
					img={<BsWallet2 className="icon" />}
				/>
			</div>
		</div>
	);
};

export default OpcionLayout;

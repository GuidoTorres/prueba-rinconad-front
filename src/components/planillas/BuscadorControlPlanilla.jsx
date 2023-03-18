import { Button, Input } from "antd";
import React from "react";
import { useContext, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CrudContext } from "../../context/CrudContext";
import { PlanillaContext } from "../../context/PlanillaContext";
const { Search } = Input;

const BuscadorControlPlanilla = ({ abrirModal, registrar }) => {
	const { setJuntarTeletrans } = useContext(PlanillaContext);
	const { setFilterText } = useContext(CrudContext);
	const handleModal = () => {
		setJuntarTeletrans(true);
	};
	return (
		<div
			className="buscador-container"
			style={{
				display: "flex",
				alignItems: "center",
			}}
		>
			<Search
				placeholder="Ingresa un termino aqui..."
				onChange={(e) => setFilterText(e.target.value)}
				style={{
					width: 300,
				}}
			/>
			<div
				style={{
					display: "flex",
					alignItems: "flex-end",
				}}
			>
				<div>
					{registrar !== false ? (
						<Button
							onClick={handleModal}
							style={{ width: "150px" }}
						>
							Juntar teletrans
						</Button>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
};

export default BuscadorControlPlanilla;

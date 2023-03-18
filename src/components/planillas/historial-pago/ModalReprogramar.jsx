import { Button, Input, Typography } from "antd";
import { useContext, useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { notificacion } from "../../../helpers/mensajes";
import MainModal from "../../modal/MainModal";

export const ModalReprogramar = ({ data, open, onClose, actualizarTabla }) => {
	const { TextArea } = Input;
	const [loading, setLoading] = useState(false);

	const { createData } = useContext(CrudContext);

	const [observacion, setObservacion] = useState(data?.observacion);

	const handleData = (e) => {
		const { value } = e.target;
		setObservacion(value);
	};

	const handleSubmit = async () => {
		setLoading(true);
		const route = "pago/reprogramacion";
		const dataReprogramacion = {
			pago_id: data.destino[0]?.pago_id,
			destino_id: data.destino[0]?.destino_id,
			tipo: data.tipo,
			estado: data.estado,
			observacion: observacion,
		};
		console.log(
			"🚀 ~ file: ModalReprogramar.jsx:30 ~ handleSubmit ~ dataReprogramacion:",
			dataReprogramacion
		);

		const response = await createData(dataReprogramacion, route);
		if (response) {
			notificacion(response.status, response.msg);
			setLoading(false);
			actualizarTabla();
			onClose();
		}
	};

	return (
		<MainModal
			title="Reprogramar pago"
			width={600}
			open={open}
			closeModal={onClose}
		>
			<div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
				<Typography style={{ fontWeight: "bold" }}>
					Observación
				</Typography>
				<TextArea
					rows={4}
					placeholder="Observación"
					onChange={handleData}
					value={observacion}
				/>
				<Button type="primary" onClick={handleSubmit} loading={loading}>
					Reprogramar
				</Button>
			</div>
		</MainModal>
	);
};

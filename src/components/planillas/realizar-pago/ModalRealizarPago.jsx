import React, { useContext, useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { tablePagosFecha } from "../../../data/dataTable";
import { notificacion } from "../../../helpers/mensajes";
import MainModal from "../../modal/MainModal";
import TablaPagosDiarios from "../../tabla/TablaPagosDiarios";
import ModalPago from "../realizar-pago/ModalPago";

const ModalRealizarPago = ({ fecha, data, actualizarTabla }) => {
	const { modal, setModal, deleteData } = useContext(CrudContext);
	const closeModal = () => {
		setModal(false);
	};

	const handleDelete = async (id) => {
		const response = await deleteData("pago", id);
		if (response) {
			notificacion(response.status, response.msg);
			closeModal();
		}
	};

	const [modalPagar, setModalPagar] = useState(false);
	const [dataPago, setDataPago] = useState([]);

	const handleOpenModalPagar = () => {
		setModalPagar(true);
	};
	const handleCloseModalPagar = (e) => {
		setModalPagar(false);
	};

	const handlePagar = (e) => {
		setDataPago(e);
		handleOpenModalPagar();
	};

	const columns = tablePagosFecha(handlePagar, handleDelete);
	return (
		<>
			<MainModal
				className={"modal-usuario"}
				title={`Pagos a realizar: ${fecha}`}
				open={modal}
				width={900}
				closeModal={closeModal}
			>
				<TablaPagosDiarios columns={columns} table={data} />
			</MainModal>
			{modalPagar && (
				<ModalPago
					open={modalPagar}
					closeModal={handleCloseModalPagar}
					data={dataPago}
					actualizarTabla={actualizarTabla}
					closeModalTablaPagos={closeModal}
				/>
			)}
		</>
	);
};

export default ModalRealizarPago;

import React, { useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { tablePagosFecha } from "../../../data/dataTable";
import { notificacion } from "../../../helpers/mensajes";
import MainModal from "../../modal/MainModal";
import Tabla from "../../tabla/Tabla";
import ModalPago from "../realizar-pago/ModalPago";

const ModalRealizaPago = ({ fecha, data, actualizarTabla }) => {
  const { dataToEdit, modal, setModal, deleteData, modal1, setModal1 } =
    useContext(CrudContext);
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

  const openModal = () => {
    setModal1(true);
  };

  const columns = tablePagosFecha(openModal, handleDelete);
  return (
    <>
      <MainModal
        className={"modal-usuario"}
        title={`Pagos a realizar: ${fecha}`}
        open={modal}
        width={900}
        closeModal={closeModal}
      >
        <Tabla columns={columns} table={data} />
      </MainModal>
      {modal1 && <ModalPago data={data.at(-1)}/>}
    </>
  );
};

export default ModalRealizaPago;

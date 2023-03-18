import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineClose, AiFillEye } from "react-icons/ai";
import { PlanillaContext } from "../../../context/PlanillaContext";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import "../style/modalPlanillaControl.css";
import ModalValidacionPagos from "./ModalValidacionPagos";
import ModalValidacionPagosAsociacion from "./ModalValidacionPagosAsociacion";
import { tablePlanillaControl } from "../../../data/dataTable";
import MainModal from "../../modal/MainModal";
import { CrudContext } from "../../../context/CrudContext";

const ModalPlanillaControl = ({ selected, actualizarTabla }) => {
  const [contrato, setContrato] = useState([]);
  const [dataSelected, setDataSelected] = useState([]);
  const {
    setPlanillaControl,
    validacionPagos,
    setValidacionPagos,
    pago,
    setPago,
    validacionPagosAsociacion,
    setValidacionPagosAsociacion,
    planillaControl,
    
  } = useContext(PlanillaContext);
  const [modalValidacion, setModalValidacion] = useState(false)
  const [modalValidacionAsociacion, setModalValidacionAsociacion] = useState(false)
  const {modal, setModal, modal2, setModal2} = useContext(CrudContext)
  const closeModal = () => {
    setPlanillaControl(false);
  };

  useEffect(() => {
    setContrato([selected]);
  }, [selected]);

  const handleValidacion = () => {
    if (selected.codigo) {
      setModalValidacionAsociacion(true);
    } else {
      setModalValidacion(true);
    }
  };

  const handlePagos = (e) => {
    setPago(true);
    setDataSelected(e);
  };

  const columns = tablePlanillaControl(handleValidacion, handlePagos);

  return (
    <MainModal
      className={"modal-planilla"}
      title={"Control de planilla"}
      open={planillaControl}
      width={900}
      closeModal={closeModal}
    >
      <Tabla columns={columns} table={contrato} />

      {modalValidacion && <ModalValidacionPagos data={selected} modal={modalValidacion} setModal={setModalValidacion}  />}
      {modalValidacionAsociacion && (
        <ModalValidacionPagosAsociacion data={selected} modal={modalValidacionAsociacion} setModal={setModalValidacionAsociacion}/>
      )}

    </MainModal>
  );
};

export default ModalPlanillaControl;

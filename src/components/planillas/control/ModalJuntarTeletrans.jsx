import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineClose, AiFillEye } from "react-icons/ai";
import { PlanillaContext } from "../../../context/PlanillaContext";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import "../style/modalPlanillaControl.css";
import ModalPago from "../realizar-pago/ModalPago";
import ModalValidacionPagos from "./ModalValidacionPagos";
import ModalValidacionPagosAsociacion from "./ModalValidacionPagosAsociacion";
import { sumarTeletrans } from "../../../data/dataTable";
import { CrudContext } from "../../../context/CrudContext";
import TablaUnirTeletrans from "../../tabla/TablaUnirTeletrans";
import "../style/modalJuntarTeletrans.css";
import BuscadorJuntarTeletrans from "../BuscadorJuntarTeletrans";
import ModalPagarVarios from "./ModalPagarVarios";
import useSearch from "../../../hooks/useSearch";
import MainModal from "../../modal/MainModal";

const ModalJuntarTeletrans = ({ selected, actualizarTabla }) => {
  const [contrato, setContrato] = useState([]);
  const [dataSelected, setDataSelected] = useState([]);
  const {
    setJuntarTeletrans,
    pagarVarios,
    setPagarVarios,
    setValidacionPagos,
    multiplesTeletrans,
    pago,
    setPago,
    validacionPagosAsociacion,
    setValidacionPagosAsociacion,
    juntarTeletrans,
  } = useContext(PlanillaContext);
  const { getData, data1, setData1 } = useContext(CrudContext);
  const { result } = useSearch(data1);

  const closeModal = () => {
    setJuntarTeletrans(false);
  };

  const getTrabajadores = async () => {
    const route = "planilla/teletrans";
    const response = await getData(route);
    setData1(response.data);
  };

  useEffect(() => {
    getTrabajadores();
  }, []);

  const handleValidacion = () => {
    if (selected.codigo) {
      setValidacionPagosAsociacion(true);
    } else {
      setValidacionPagos(true);
    }
  };

  const handlePagos = (e) => {
    setPago(true);
    setDataSelected(e);
  };

  const columns = sumarTeletrans(handleValidacion, handlePagos);

  return (
    <MainModal
      className={"modal-juntar"}
      title={"Juntar teletrans"}
      open={juntarTeletrans}
      width={800}
      closeModal={closeModal}
    >
      <BuscadorJuntarTeletrans registrar={true} />
      <div style={{ marginTop: "20px" }}>
        <TablaUnirTeletrans columns={columns} table={result} />
      </div>

      {pagarVarios && (
        <ModalPagarVarios
          data={selected}
          selected={dataSelected}
          actualizarTabla={actualizarTabla}
        />
      )}
    </MainModal>
  );
};

export default ModalJuntarTeletrans;

import React, { useContext, useEffect, useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import ModalRegistroEvaluacion from "./ModalRegistroEvaluacion";
import Tabla from "../../tabla/Tabla";

import { tableHistorialEvaluacion } from "../../../data/dataTable";
import BuscadorEvaluacion from "../BuscadorEvaluacion";
import MainModal from "../../modal/MainModal";
import { notificacion } from "../../../helpers/mensajes";
import "../styles/modalHistorialEvaluacion.css";
import Cargando from "../../cargando/Cargando";
import { Empty } from "antd";

const ModalHistorialEvaluacion = ({ selected, actualizarTrabajador, data }) => {
  const route = "evaluacion";
  const [search, setSearch] = useState([]);
  const [filterText, setFilterText] = useState("");

  const {
    getDataById,
    deleteData,
    data1,
    setData1,
    setDataToEdit,
    modal1,
    setModal1,
    setModal3,
    modal3,
    cargando,
    setCargando,
  } = useContext(CrudContext);
  const [historial, setHistorial] = useState([]);

  const getEvaluacion = async () => {
    const response = await getDataById(route, selected.dni);
    setData1(response.data);
  };
  const handleEdit = (e) => {
    setDataToEdit(e);
    setModal3(true);
  };
  const handleDelete = async (id) => {
    const response = await deleteData(route, id.evaluacion_id);

    if (response) {
      notificacion(response.status, response.msg);
      closeModal();
      actualizarTrabajador();
    }
  };

  useEffect(() => {
    const filtered =
      data1 &&
      data1
        .filter((item) =>
          item?.fecha_evaluacion
            ?.split("T")[0]
            ?.toLowerCase()
            .includes(filterText.toLowerCase())
        )

        .flat();
    setSearch(filtered);
  }, [filterText, data1]);

  useEffect(() => {
    getEvaluacion();
  }, []);

  const closeModal = () => {
    setModal1(false);
    actualizarTrabajador();
    setData1([]);
  };

  const columns = tableHistorialEvaluacion(handleEdit, handleDelete);

  return (
    <MainModal
      className={"modal-historial-evaluacion"}
      title="Historial de evaluaciones"
      open={modal1}
      width={950}
      closeModal={closeModal}
    >
      <section className="evaluacion-buscador">
        <BuscadorEvaluacion
          abrirModal={setModal3}
          registrar={true}
          data={data}
          setFilterText={setFilterText}
        />
      </section>
      {data1.length > 0 ? (
        <Tabla columns={columns} table={search} />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span>No hay registros para mostrar.</span>}
        />
      )}

      {modal3 && (
        <ModalRegistroEvaluacion
          actualizarTabla={getEvaluacion}
          selected={selected}
          actualizarTrabajador={actualizarTrabajador}
        />
      )}
    </MainModal>
  );
};

export default ModalHistorialEvaluacion;

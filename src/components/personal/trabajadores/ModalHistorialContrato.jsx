import React, { useContext, useEffect, useState } from "react";
import Tabla from "../../tabla/Tabla";
import { CrudContext } from "../../../context/CrudContext";
import ModalRegistrarContrato from "./ModalRegistrarContrato";
import { tableHistorialContrato } from "../../../data/dataTable";
import BuscadorContrato from "../BuscadorContrato";
import useSearch from "../../../hooks/useSearch";
import MainModal from "../../modal/MainModal";
import { notificacion } from "../../../helpers/mensajes";
import { Empty } from "antd";

import "../styles/modalHistorialContrato.css";
import Cargando from "../../cargando/Cargando";

const ModalHistorialContrato = ({
  selected,
  actualizarTrabajadores,
  trabajador,
  data,
}) => {
  const route = "contrato";

  const {
    getDataById,
    deleteData,
    data1,
    setData1,
    setDataToEdit,
    modal2,
    setModal2,
    modal3,
    setModal3,
    cargando,
    setCargando,
  } = useContext(CrudContext);

  const [search, setSearch] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [id, setId] = useState("");

  const getContrato = async () => {
    const route = "contrato";
    const response = await getDataById(route, selected);

    if (response) {
      const filterContratos = response.data
        ?.map((item) => item.contratos)
        .flat();
      setData1(filterContratos);
    }
  };

  const handleEdit = (e) => {
    setDataToEdit(e);
    setModal3(true);
    setId(e);
  };
  useEffect(() => {
    const filtered =
      data1 &&
      data1
        .filter(
          (item) =>
            item?.fecha_inicio
              ?.split("T")[0]
              ?.toLowerCase()
              ?.includes(filterText.toLowerCase()) ||
            item?.fecha_fin
              ?.split("T")[0]
              ?.toLowerCase()
              ?.includes(filterText.toLowerCase()) ||
            item?.tipo_contrato
              ?.toLowerCase()
              ?.includes(filterText.toLowerCase())
        )

        .flat();
    setSearch(filtered);
  }, [filterText, data1]);

  const handleDelete = async (id) => {
    const response = await deleteData(route, id.id);

    if (response) {
      notificacion(response.status, response.msg);
      closeModal();
      actualizarTrabajadores();
    }
  };

  const closeModal = () => {
    setModal2(false);
    setData1([]);
  };
  useEffect(() => {
    getContrato();
  }, []);

  const columns = tableHistorialContrato(handleEdit, handleDelete);
  return (
    <MainModal
      className={"modal-historial-evaluacion"}
      title="Historial de contratos"
      open={modal2}
      width={900}
      closeModal={closeModal}
    >
      <section className="buscador">
        <BuscadorContrato
          abrirModal={setModal3}
          registrar={true}
          tipo={"contrato"}
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
        <ModalRegistrarContrato
          actualizarTabla={getContrato}
          selected={id}
          trabajadorDni={data.dni}
          actualizarTrabajadores={actualizarTrabajadores}
          trabajador={trabajador}
          idContrato={data1}
        />
      )}
    </MainModal>
  );
};

export default ModalHistorialContrato;

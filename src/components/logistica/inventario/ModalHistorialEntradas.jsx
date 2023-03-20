import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import {
  entradas,
  productoEntrada,
  productoSalida,
} from "../../../data/dataTable";
import Tabla from "../../tabla/Tabla";
import BuscadorEntradaSalida from "../BuscadorEntradaSalida";
import "../styles/modalEntradaSalida.css";
import ModalRegistrarEntradaSalida from "./ModalRegistrarEntradaSalida";
import { Modal, Empty } from "antd";
import { notificacion } from "../../../helpers/mensajes";
import dayjs from "dayjs";

const ModalHistorialEntradas = ({ id, data, actualizarProductos }) => {
  const {
    setModal1,
    modal1,
    setModal2,
    modal2,
    tipo,
    setTipo,
    getDataById,
    deleteData,
    getData,

    setDataToEdit,
  } = useContext(CrudContext);
  const [historial, setHistorial] = useState();
  const [search, setSearch] = useState([]);
  const [filterText, setFilterText] = useState();
  const closeModal = () => {
    setModal1(false);
    setTipo("");
  };

  const getHistorial = async () => {
    const routeId = `entrada/${id}?tipo=${tipo}`;
    const response = await getData(routeId);
    setHistorial(response.data);
  };
  useEffect(() => {
    getHistorial();
  }, [tipo]);

  const handleEdit = (e) => {
    setDataToEdit(e);
    setModal2(true);
  };

  useEffect(() => {
    let filter
    if (tipo === "entrada") {
       filter = historial?.filter(
        (item) =>
          item?.id
            ?.toString()
            ?.toLowerCase()
            ?.includes(filterText?.toLowerCase()) ||
          item?.encargado?.toLowerCase()?.includes(filterText?.toLowerCase()) ||
          item?.codigo_compra
            ?.toLowerCase()
            ?.includes(filterText?.toLowerCase()) ||
          item?.codigo_factura
            ?.toLowerCase()
            ?.includes(filterText?.toLowerCase())
      );

    }

    if (tipo === "salida") {
       filter = historial?.filter(
        (item) =>
          item?.id
            ?.toString()
            ?.toLowerCase()
            ?.includes(filterText?.toLowerCase()) ||
          item?.encargado?.toLowerCase()?.includes(filterText?.toLowerCase()) ||
          item?.codigo_compra
            ?.toLowerCase()
            ?.includes(filterText?.toLowerCase()) ||
          item?.codigo_factura
            ?.toLowerCase()
            ?.includes(filterText?.toLowerCase()) ||
          item?.area?.nombre
            ?.toLowerCase()
            ?.includes(filterText?.toLowerCase()) ||
          item?.motivo?.toLowerCase()?.includes(filterText?.toLowerCase())
      );

    }
    if(filterText){

      setSearch(filter);
    }else{
      setSearch(historial)
    }
  }, [filterText, historial, tipo]);

  const handleDelete = async (e) => {
    const route = "entrada";
    const response = await deleteData(route, e.id);
    if (response.status === 200) {
      notificacion(response.status, response.msg);
      getHistorial();
    }
  };

  const colums1 = productoEntrada(handleEdit, handleDelete);
  const colums2 = productoSalida(handleEdit, handleDelete);

  return (
    <Modal
      className="modal-entradas"
      title={
        tipo === "entrada" ? "Historial de entradas" : "Historial de salidas"
      }
      open={modal1}
      centered
      onCancel={closeModal}
      footer={null}
      width={1020}
    >
      <BuscadorEntradaSalida
        abrirModal={setModal2}
        modal={true}
        filterText={setFilterText}
      />

      <br />
      {tipo === "entrada" ? (
        historial?.length > 0 ? (
          <Tabla columns={colums1} table={search} />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No hay registros para mostrar.</span>}
          />
        )
      ) : historial?.length > 0 ? (
        <Tabla columns={colums2} table={search} />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span>No hay registros para mostrar.</span>}
        />
      )}

      <ModalRegistrarEntradaSalida
        almacen_id={id}
        actualizarTabla={getHistorial}
        productos={data}
        tipo={tipo}
        actualizarProductos = {actualizarProductos}
      />
    </Modal>
  );
};

export default ModalHistorialEntradas;

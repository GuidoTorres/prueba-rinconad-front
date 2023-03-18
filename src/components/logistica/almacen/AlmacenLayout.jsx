import { Empty } from "antd";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { almacen } from "../../../data/dataTable";
import { notificacion } from "../../../helpers/mensajes";
import useSearch from "../../../hooks/useSearch";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import Buscador from "./Buscador";
import ModalRegistrarAlmacen from "./ModalRegistrarAlmacen";

const AlmacenLayout = () => {
  const {
    getData,
    data,
    setData,
    dataToEdit,
    setDataToEdit,
    modal,
    setModal,
    deleteData,
  } = useContext(CrudContext);

  const { result } = useSearch(data);

  const getAlmacenes = async () => {
    const route = "almacen";
    const response = await getData(route);
    setData(response.data);
  };

  useEffect(() => {
    getAlmacenes();
  }, []);

  const handleEdit = (e) => {
    setDataToEdit(e);
    setModal(true);
  };
  const handleDelete = async (e) => {
    const route = "almacen";
    const response = await deleteData(route, e);
    if (response) {
      notificacion(response.status, response.msg);
      getAlmacenes();
    }
  };

  const columns = almacen(handleEdit, handleDelete);
  return (
    <>
      <Header text={"Almacenes"} user={"Usuario"} ruta={"/logistica"} />
      <div className="margenes">
        <Buscador abrirModal={setModal} />
        {result?.length > 0 ? (
          <Tabla columns={columns} table={result} />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No hay registros para mostrar.</span>}
          />
        )}
      </div>

      <ModalRegistrarAlmacen actualizarTabla={getAlmacenes} />
    </>
  );
};

export default AlmacenLayout;

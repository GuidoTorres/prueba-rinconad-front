import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import BuscadorSucursales from "../BuscadorSucursales";
import { sucursalData } from "../../../data/dataTable";
import ModalRegistrar from "./ModalRegistrar";
import { notificacion } from "../../../helpers/mensajes";
import { Empty } from "antd";

const Sucursales = () => {
  const {
    getData,
    setData,
    data,
    deleteData,
    dataToEdit,
    setDataToEdit,
    modal,
    setModal,
  } = useContext(CrudContext);

  const getSucursal = async () => {
    let route = "sucursal";
    let response = await getData(route);
    setData(response.data);
  };

  useEffect(() => {
    getSucursal();
  }, []);

  const handleEdit = (e) => {
    setDataToEdit(e);
    setModal(true);
  };

  const handleDelete = async (e) => {
    let route = "sucursal";
    const response = await deleteData(route, e);
    if (response) {
      notificacion(response.status, response.msg);
      getSucursal();
    }
  };

  const columns = sucursalData(handleEdit, handleDelete);
  return (
    <>
      <Header text={"Sucursales"} user={"Usuario"} ruta={"/finanzas"} />
      <div className="margenes">
      <BuscadorSucursales abrirModal={setModal} />

     
      {data?.length > 0 ? (
          <Tabla columns={columns} table={data} />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No hay registros para mostrar.</span>}
          />
        )}
      </div>

      {modal && <ModalRegistrar actualizarTabla={getSucursal} />}
    </>
  );
};

export default Sucursales;

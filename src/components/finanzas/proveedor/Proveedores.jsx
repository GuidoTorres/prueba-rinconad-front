import React from "react";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import BuscadorSucursales from "../BuscadorSucursales";
import { proveedor } from "../../../data/dataTable";
import { useContext } from "react";
import ModalRegistrarProveedor from "./ModalRegistrar";
import { CrudContext } from "../../../context/CrudContext";
import { useEffect } from "react";
import { notificacion } from "../../../helpers/mensajes";
import { Empty } from "antd";

const Proveedores = () => {
  const { getData, setData, data, deleteData, setDataToEdit, modal, setModal } =
    useContext(CrudContext);

  const getProveedor = async () => {
    let route = "proveedor";
    const response = await getData(route);
    setData(response.data);
  };

  const handleEdit = (e) => {
    setDataToEdit(e);
    setModal(true);
  };

  const handleDelete = async (e) => {
    let route = "proveedor";
    const response = await deleteData(route, e);
    if (response) {
      notificacion(response.status, response.msg);
      getProveedor();
    }
  };

  useEffect(() => {
    getProveedor();
  }, []);

  const columns = proveedor(handleEdit, handleDelete);

  return (
    <>
      <Header text={"Proveedores"} user={"Usuario"} ruta={"/finanzas"} />
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

      {modal && <ModalRegistrarProveedor actualizarTabla={getProveedor} />}
    </>
  );
};

export default Proveedores;

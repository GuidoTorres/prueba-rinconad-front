import { Empty } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { pedidoLayout, requerimientoLayout } from "../../../data/dataTable";
import { notificacion } from "../../../helpers/mensajes";
import Header from "../../header/Header";
import TablaExpandibleTransferencia from "../../tabla/TablaExpandibleTransferencia";
import TablaRequerimientos from "../../tabla/TablaRequerimientos";
import BuscadorRequerimiento from "../BuscadorRequerimiento";
import ModalRequerimiento from "../inventario/ModalRequerimiento";
import ModalGenerarPedido from "./ModalGenerarPedido";

const RequerimientoLayout = () => {
  const {
    getData,
    data,
    setData,
    dataToEdit,
    setDataToEdit,
    modal,
    setMultipleRequerimientos,
    updateData,
    modal3,
    setModal3,
    multipleRequerimientos,
    deleteData,
  } = useContext(CrudContext);

  const [requerimientos, setRequerimientos] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [textFilter, setTextFilter] = useState("");
  const [search, setSearch] = useState([]);
  const [textFilter2, setTextFilter2] = useState("");
  const [search2, setSearch2] = useState([]);

  const getRequerimiento = async () => {
    const route = "requerimiento";
    const route1 = "pedido";
    const response = await getData(route);
    const response1 = await getData(route1);
    setRequerimientos(response.data);
    setPedido(response1.data);
  };

  useEffect(() => {
    getRequerimiento();
  }, []);

  const handleDeletePedido = async (e) => {
    console.log(e);
    const req_id = e.requerimiento_pedidos.map((item) => item.requerimiento_id);
    const route = `pedido`;

    const response = await deleteData(route, `${e.id}?ids=${req_id}`);
    if (response) {
      notificacion(response.status, response.msg);
      getRequerimiento();
    }
  };
  const handleDeleteRequerimiento = async (e) => {
    console.log(e);
    const route = `requerimiento`;

    const response = await deleteData(route, e.id);
    if (response) {
      notificacion(response.status, response.msg);
      getRequerimiento();
    }
  };

  // buscador de tabla extensible de requerimientos
  useEffect(() => {
    const filter =
      requerimientos &&
      requerimientos.filter(
        (item) =>
          item?.id
            .toString()
            ?.toLowerCase()
            ?.includes(textFilter?.toLowerCase()) ||
          item?.fecha_pedido
            ?.toLowerCase()
            ?.includes(textFilter?.toLowerCase()) ||
          item?.solicitante
            ?.toLowerCase()
            ?.includes(textFilter?.toLowerCase()) ||
          item?.almacen?.toLowerCase()?.includes(textFilter?.toLowerCase()) ||
          item?.area?.toLowerCase()?.includes(textFilter?.toLowerCase()) ||
          item?.requerimiento_productos
            ?.map((data) => data?.producto?.nombre)
            ?.toString()
            ?.toLowerCase()
            ?.includes(textFilter?.toLowerCase())
      );
    setSearch(filter);
  }, [textFilter, requerimientos]);

  // buscador de tabla extensible de pedidos
  useEffect(() => {
    const filter =
      pedido &&
      pedido.filter(
        (item) =>
          item?.id
            .toString()
            ?.toLowerCase()
            ?.includes(textFilter2.toLowerCase()) ||
          item?.fecha
            ?.toLowerCase()
            ?.includes(textFilter2.toLowerCase()) ||
          item?.solicitante
            ?.toLowerCase()
            ?.includes(textFilter2.toLowerCase()) ||
          item?.productos
            ?.map((data) => data?.producto?.nombre)
            ?.toString()
            ?.toLowerCase()
            ?.includes(textFilter2.toLowerCase()) || 
            item?.requerimiento_pedidos
            ?.map((data) => data?.requerimiento_id)
            ?.toString()
            ?.toLowerCase()
            ?.includes(textFilter2.toLowerCase())
      );
      console.log(filter);
    setSearch2(filter);
  }, [textFilter2, pedido]);

  const updatePedido = async (e, i) => {
    const route = "pedido";
    const info = {
      [e.target.name]: e.target.value,
    };

    const response = await updateData(info, i.id, route);
    if (response.status === 200) {
      getRequerimiento();
    }
  };

  const handleEdit = (e) => {
    setModal3(true);
    setDataToEdit(e);
  };

  const columns = requerimientoLayout(handleEdit, handleDeleteRequerimiento);
  const pedidoColumns = pedidoLayout(updatePedido, handleDeletePedido);

  return (
    <>
      <Header text={"Requerimientos"} user={"Usuario"} ruta={"/logistica"} />
      <br />
      <br />
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1" }}>
          <label htmlFor="" style={{ marginLeft: "20px" }}>
            <strong>Requerimientos</strong>{" "}
          </label>
          <div className="margenes">
            <BuscadorRequerimiento
              generar={true}
              data={multipleRequerimientos}
              setFilterText={setTextFilter}
            />

            <TablaRequerimientos
              columns={columns}
              table={search}
              set={setMultipleRequerimientos}
            />
          </div>
        </div>
        <br />
        <div style={{ flex: "1" }}>
          <label htmlFor="" style={{ marginLeft: "20px" }}>
            <strong>Pedidos</strong>
          </label>

          <div className="margenes">
            <BuscadorRequerimiento
              generar={false}
              setFilterText={setTextFilter2}
            />

            {pedido?.length > 0 ? (
              <TablaExpandibleTransferencia
                columns={pedidoColumns}
                table={search2}
              />
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<span>No hay registros para mostrar.</span>}
              />
            )}
          </div>
        </div>
      </div>

      {modal && <ModalGenerarPedido actualizarTabla={getRequerimiento} />}
      {modal3 && <ModalRequerimiento actualizarTabla={getRequerimiento} />}
    </>
  );
};

export default RequerimientoLayout;

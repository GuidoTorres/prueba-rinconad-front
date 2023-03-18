import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import {
  transferenciaRealizada,
  transferenciaRecibida,
} from "../../../data/dataTable";
import { notificacion } from "../../../helpers/mensajes";
import Header from "../../header/Header";
import TablaTransferencia from "../../tabla/TablaTransferencia";
import BuscadorTransferencia from "./BuscadorTransferencia";
import ModalTransferencia from "./ModalTransferencia";
import { Input, Button, Radio, Select, Empty } from "antd";
import "../styles/transferenciaLayout.css";
import Cargando from "../../cargando/Cargando";
const { Search } = Input;

const TransferenciaLayout = () => {
  const {
    getData,
    setData,
    data,
    setModal,
    modal,
    updateData,
    createData,
    deleteData,
    loading,
  } = useContext(CrudContext);
  const [almacen, setAlmacen] = useState([]);
  const [almacen_id, setAlmacen_id] = useState("");
  const [recibida, setRecibida] = useState([]);

  const getAlmacen = async () => {
    const route1 = "almacen";
    const response1 = await getData(route1);
    setAlmacen(response1.data);
  };

  const getTransferencia = async () => {
    const route = `transferencia/realizada/${almacen_id}`;
    const route2 = `transferencia/recibida/${almacen_id}`;
    const response = await getData(route);
    const response2 = await getData(route2);
    setData(response.data);
    setRecibida(response2.data);
  };
  useEffect(() => {
    getAlmacen();
  }, []);
  useEffect(() => {
    if (almacen_id !== "") {
      getTransferencia();
    }
  }, [almacen_id]);

  const updateEstado = async (a, e) => {
    const route = "transferencia";
    const response = await updateData(e, e.id, route);
    if (response.status === 200) {
      notificacion(response.status, response.msg);
      getTransferencia();
    }
  };

  const handleDelete = async (e) => {
    const route = `transferencia`;
    const response = await deleteData(route, e.id);
    if (response.status === 200) {
      notificacion(response.status, response.msg);
      getTransferencia();
    }
  };

  const retornarTransferencia = async (e) => {
    const route = `transferencia/retornar/${e.id}`;
    const retornar = {
      transferencia_id: e.id,
      productos: e.transferencia_productos.map((item) => {
        return {
          id: item.producto.id,
          cantidad: item.cantidad,
          stock: item.producto.stock,
        };
      }),
    };
    const response = await createData(retornar, route);
    if (response) {
      notificacion(response.status, response.msg);
      getTransferencia();
    }
  };

  const columns = transferenciaRealizada(retornarTransferencia, handleDelete);
  const columns2 = transferenciaRecibida(updateEstado);
  return (
    <>
      <Header text={"Transferencias"} user={"Usuario"} ruta={"/logistica"} />

      <div className="transferencia-layout">
        <div>
          <div className="almacen">
            <label htmlFor="">
              <strong>Seleccione un almacén:</strong>{" "}
            </label>
            <Select
              placeholder="Almacén"
              name="almacen_id"
              onChange={(e) => setAlmacen_id(e)}
              style={{ width: "200px" }}
              options={almacen.map((item, i) => {
                return {
                  label: item.nombre,
                  value: item.id,
                };
              })}
            ></Select>
          </div>

          {almacen_id !== "" ? (
            <div className="margenes">
              <BuscadorTransferencia abrirModal={setModal} realizar={true} />
              {data.length > 0 ? (
                <TablaTransferencia columns={columns} table={data} />
              ) : (
                <div className="noData">
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={<span>No hay registros para mostrar.</span>}
                  />
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </div>

        {almacen_id !== "" ? (
          <div>
            <br />
            <br />
            <br />
            <br />
            <div className="margenes">
              <BuscadorTransferencia abrirModal={setModal} realizar={false} />
              {recibida.length > 0 ? (
                <TablaTransferencia columns={columns2} table={recibida} />
              ) : (
                <div className="noData">
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={<span>No hay registros para mostrar.</span>}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {modal && (
        <ModalTransferencia
          almacen_id={almacen_id}
          actualizarTabla={getTransferencia}
        />
      )}
    </>
  );
};

export default TransferenciaLayout;

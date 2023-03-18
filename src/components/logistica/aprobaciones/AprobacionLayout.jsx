import React from "react";
import { useEffect, useContext, useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { aprobacionLayout } from "../../../data/dataTable";
import { notificacion } from "../../../helpers/mensajes";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import BuscadorAprobacion from "../BuscadorAprobacion";
import useSearch from "../../../hooks/useSearch";
import { Empty } from "antd";
import TablaRequerimientos from "../../tabla/TablaRequerimientos";
import TablaAprobaciones from "../../tabla/TablaAprobaciones";

const AprobacionLayout = () => {
  const { getData, updateData } = useContext(CrudContext);
  const [data, setData] = useState([]);
  const [dataAprobacion, setDataAprobacion] = useState();

  const getAprobacion = async () => {
    const response = await getData("requerimiento");
    setData(response.data);
  };

  const { result } = useSearch(data);

  useEffect(() => {
    getAprobacion();
  }, []);

  useEffect(() => {
    if (dataAprobacion !== undefined) {
      getAprobacion();
      const aprobacionPrueba = data.filter(
        (item) => item.id === dataAprobacion.id
      );
      const aprobacionLength = aprobacionPrueba.filter(
        (item) =>
          item.aprobacion1 === true &&
          item.aprobacion2 === true &&
          item.aprobacion3 === true
      );

      if (aprobacionLength.length > 0) {
        const info = {
          estado: true,
        };
        console.log("true");
        updateEstado(dataAprobacion, info);
      }
      if (aprobacionLength === 0) {
        const info = {
          estado: false,
        };
        console.log("false");

        updateEstado(dataAprobacion, info);
      }
    }
  }, [dataAprobacion]);

  const updateEstado = async (dataAprobacion, info) => {
    const route = "requerimiento";
    const response = await updateData(info, dataAprobacion.id, route);
    if (response) {
      notificacion(response.status, response.mensaje);
      getAprobacion();
    }
  };

  const updateAprobacion = async (e, i) => {
    const route = "requerimiento";
    setDataAprobacion(i);
    const info = {
      [e.target.name]: e.target.checked,
    };

    const response = await updateData(info, i.id, route);
    if (response) {
      notificacion(response.status, response.msg);
      getAprobacion();
    }
  };

  const handleDelete = () => {};

  const columns = aprobacionLayout(updateAprobacion, handleDelete);

  return (
    <>
      <Header text={"Aprobaciones"} user={"Usuario"} ruta={"/logistica"} />

      <div className="margenes">
        <BuscadorAprobacion />

        {result?.length > 0 ? (
          <TablaAprobaciones columns={columns} table={result} />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No hay registros para mostrar.</span>}
          />
        )}
      </div>
    </>
  );
};

export default AprobacionLayout;

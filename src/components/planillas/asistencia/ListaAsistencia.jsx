import React, { useContext, useEffect, useState } from "react";
import Header from "../../header/Header";
import { CrudContext } from "../../../context/CrudContext";
import ModalCrearAsistencia from "./ModalCrearAsistencia";
import useSearch from "../../../hooks/useSearch";
import { Calendar, theme, Button } from "antd";
import { BsTrash, BsPencil } from "react-icons/bs";
import { notificacion } from "../../../helpers/mensajes";
import "moment/locale/es-mx";
import locale from "antd/es/date-picker/locale/es_ES";
import "../style/listaAsistencia.css";
import dayjs from "dayjs";

const ListaAsistencia = () => {
  const wrapperStyle = {
    width: "80%",
    height: "70%",
    border: `1px solid lightgrey`,
    borderRadius: "6px",
    padding: "10px",
  };

  const { getData, setData, data, deleteData, modal, setModal, createData } =
    useContext(CrudContext);
  const [fechaId, setFechaId] = useState("");

  const { result } = useSearch(data);

  const getAsistencia = async () => {
    const route = "asistencia";
    const response = await getData(route);
    setData(response.data);
  };

  useEffect(() => {
    getAsistencia();
  }, []);

  const handleEdit = (e, value) => {
    e.stopPropagation();
    setFechaId(dayjs(value).format("YYYY-MM-DD"));
    setModal(true);
  };

  const handleDelete = async (e, fecha) => {
    e.stopPropagation();
    const id = data
      ?.filter((item) => item?.fecha === dayjs(fecha).format("YYYY-MM-DD"))
      .map((item) => item.id)
      .toString();
    const route = "asistencia";
    const response = await deleteData(route, id);
    if (response) {
      notificacion(response.status, response.msg);
      getAsistencia();
    }
  };
  const crearAsistencia = async (fecha) => {

    const route = "asistencia";
    const asistencia = {
      fecha: dayjs(fecha).format("YYYY-MM-DD"),
      hora_ingreso: "07:30",
    };
    const response = await createData(asistencia, route);
    if (response) {
      // notificacion(response.status, response.msg);
      getAsistencia();
    }
  };
  const renderCell = (date) => {
    const fechaCalendario = dayjs(date).format("YYYY-MM-DD");
    const filtrarFecha = data?.filter((item) => item.fecha === fechaCalendario);
    if (filtrarFecha.length > 0) {
      return (
        <div className="calendar-data">
          <label htmlFor="">Asistencia creada</label>
          <div>
            <BsPencil onClick={(e) => handleEdit(e, date)} />
            <BsTrash
              onClick={(e) => handleDelete(e, date)}
              className="eliminar"
            />
          </div>
        </div>
      );
    } else {
      return "";
    }
  };
  // const columns = listaAsistencia(handleEdit, handleDelete);

  const onSelect = (e) => {
    const fecha = dayjs(e).format("YYYY-MM-DD");
    crearAsistencia(e,fecha);
    // setModal(true);
  };
  return (
    <div className="lista-asistencia">
      <Header text={"Asistencia"} user={"Usuario"} ruta={"/planilla"} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <div style={wrapperStyle}>
          <Calendar
            fullscreen={true}
            onChange={onSelect}
            mode="month"
            locale={locale}
            dateCellRender={renderCell}
          />
        </div>
      </div>
      {modal && (
        <ModalCrearAsistencia
          data={fechaId}
          actualizarTabla={getAsistencia}
          fechas={data}
        />
      )}
    </div>
  );
};

export default ListaAsistencia;

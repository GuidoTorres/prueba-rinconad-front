import React, { useContext, useEffect } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { AiOutlineClose, AiFillEye } from "react-icons/ai";
import Buscador from "../Buscador";
import Tabla from "../../tabla/Tabla";
import { PlanillaContext } from "../../../context/PlanillaContext";
import Fechas from "./Fechas";
import "../style/modalValidacionPagosAsociacion.css";
import { useState } from "react";
import MainModal from "../../modal/MainModal";
const ModalValidacionPagosAsociacion = ({ data, modal2, setModal2 }) => {
  const {
    setValidacionPagosAsociacion,
    setFechas,
    fechas,
    verificacion,
    setVerificacion,
  } = useContext(PlanillaContext);
  const { getDataById, data3, setData3,  data2 } =
    useContext(CrudContext);
  const [text, setText] = useState();
  const [fechasTabla, setFechasTabla] = useState();

  const getTareoAsociacion = async () => {
    const route = "planilla/tareo/asociacion";
    const response = await getDataById(route, data.id);
    setData3(response.data);
  };
  useEffect(() => {
    getTareoAsociacion();
  }, []);

  const modalVerificacion = (data) => {
    setVerificacion(true);
    setText(data);
  };

  const closeModal = () => {
    setModal2(false);
  };

  useEffect(() => {
    setFechas(data3);
    setFechasTabla(
      data3.map((item) => item.fecha).filter((item) => item !== undefined)
    );
  }, [data3]);

  return (
    <MainModal
      className={"modal-validacion"}
      title={"Hoja de tareo"}
      open={modal2}
      width={900}
      closeModal={closeModal}
    >
      <section style={{ paddingLeft: "30px" }}>
        <div>
          <label htmlFor="">
            Nombre: {data && data?.nombre ? data.nombre : "---"}
          </label>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "5px",
          }}
        >
          <div>
            <label htmlFor="">
              Dni: {data && data?.dni ? data.dni : "---"}
            </label>
          </div>
          <div style={{ marginLeft: "50px" }}>
            <label htmlFor="">
              Teléfono: {data && data?.telefono ? data.telefono : "---"}
            </label>
          </div>
          <div style={{ marginLeft: "50px" }}>
            <label htmlFor="">
              Cargo: {data && data?.cargo ? data.cargo : "---"}
            </label>
          </div>
        </div>
      </section>
      <section className="table-container">
        <table>
          <tr style={{}}>
            <th>Nro</th>
            <th>Hoja de tareo asistencia de operacion</th>

            {fechasTabla?.map((item) =>
              item.map((data) => (
                <th
                  style={{ writingMode: "vertical-lr", transform: "scale(-1)" }}
                >
                  <span>{data}</span>
                </th>
              ))
            )}
          </tr>
          {data3?.map((item, index) => (
            <tr key={index + 2}>
              <td>{index + 1}</td>
              <td>
                {item?.nombre +
                  " " +
                  item?.apellido_paterno +
                  " " +
                  item?.apellido_materno}
              </td>
              {item?.trabajador_asistencia?.map((data) => (
                <td>
                  {data.asistencia === "Permiso"
                    ? "P"
                    : data.asistencia === "Asistio"
                    ? "X"
                    : data.asistencia === "Falto"
                    ? "F"
                    : data.asistencia === "Dia libre"
                    ? "DL"
                    : data.asistencia === "Comision"
                    ? "C"
                    : "F"}
                </td>
              ))}
            </tr>
          ))}
        </table>
      </section>
      <section
        style={{
          paddingLeft: "30px",
          marginTop: "20px",
          display: "flex",
          gap: 20,
          paddingRight: "30px",
        }}
      >
        <button
          style={{
            padding: "10px",
            backgroundColor: "white",
            borderRadius: "6px",
            border: "1px solid grey",
          }}
          onClick={() => modalVerificacion("Verificación Gerente de Op.")}
        >
          Verificación Gerente de Op.
        </button>
        <button
          style={{
            padding: "10px",
            backgroundColor: "white",
            borderRadius: "6px",
            border: "1px solid grey",
          }}
          onClick={() => modalVerificacion("Verificación Jefe de Operaciones")}
        >
          Verificación Jefe de Operaciones
        </button>
        <button
          style={{
            padding: "10px",
            backgroundColor: "white",
            borderRadius: "6px",
            border: "1px solid grey",
          }}
          onClick={() => modalVerificacion("Validacion de Trabajador")}
        >
          Validacion de Trabajador
        </button>
      </section>
    </MainModal>
  );
};

export default ModalValidacionPagosAsociacion;

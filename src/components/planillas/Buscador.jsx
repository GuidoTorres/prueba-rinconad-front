import React from "react";
import { useContext, useRef } from "react";
import { CrudContext } from "../../context/CrudContext";
import { PlanillaContext } from "../../context/PlanillaContext";
import { Input, Button, Radio } from "antd";
import { notificacion } from "../../helpers/mensajes";
import "./style/buscador.css";
import { handleDownloadExcel } from "../../helpers/tablaExcel";
import Item from "antd/es/list/Item";
const { Search } = Input;

const Buscador = ({
  abrirModal,
  registrar,
  crear,
  exportar,
  cargar,
  actualizarTabla,
  actualizarAsistencia,
  actualizar,
  buscador,
  cargando,
  setCargando,
  data1,
  data2,
}) => {
  const { createData, setFilterText } = useContext(CrudContext);
  const { setControlAsistencia } = useContext(PlanillaContext);
  const inputFileRef = useRef(null);

  const handleModal = () => {
    abrirModal(true);
  };

  const changeHandler = (e) => {
    inputFileRef.current.click();
  };

  const excelFile = async (e) => {
    const result = data2?.map((dat) => {
      return {
        Nro: 1,
        Nombres_Apellidos: data1?.nombre,
        dni: data1?.dni,
        Celular: data1?.telefono,
        Cargo: data1?.contratos?.puesto,
        Área: data1?.contratos?.area,
        [dat?.asistencium?.fecha]:
          dat.asistencia === "Permiso"
            ? "P"
            : dat.asistencia === "Asistio"
            ? "X"
            : dat.asistencia === "Falto"
            ? "F"
            : dat.asistencia === "Dia libre"
            ? "DL"
            : dat.asistencia === "Comision"
            ? "C"
            : "F",
      };
    });
    console.log(result);
    // handleDownloadExcel(result, "Hoja de tareo", "Hoja de tareo");
  };

  return (
    <div
      className="buscador-container"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <input
        type="file"
        ref={inputFileRef}
        onChange={excelFile}
        style={{ display: "none" }}
      />
      {buscador ? (
        <Search
          placeholder="Ingresa una fecha..."
          onChange={(e) => setFilterText(e.target.value)}
          style={{
            width: 300,
          }}
        />
      ) : (
        <div>
          {registrar !== false ? (
            <Button onClick={handleModal} style={{ width: "100px" }}>
              Registrar
            </Button>
          ) : (
            ""
          )}
          {exportar !== false ? (
            <Button
              onClick={excelFile}
              style={{ width: "100px" }}
              loading={cargando ? true : false}
            >
              Exportar{" "}
            </Button>
          ) : (
            ""
          )}
          {/* {cargar !== false ? (
            <Button style={{ width: "100px" }} onClick={changeHandler}>
              Cargar
            </Button>
          ) : (
            ""
          )} */}
        </div>
      )}
    </div>
  );
};

export default Buscador;

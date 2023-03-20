import React, { useContext, useRef } from "react";
import { CrudContext } from "../../context/CrudContext";
import { Input, Button } from "antd";
import { notificacion } from "../../helpers/mensajes";
import { AiOutlineForm, AiOutlineVerticalAlignBottom } from "react-icons/ai";
import "./styles/buscador.css";
const { Search } = Input;

const Buscador = ({
  abrirModal,
  importar,
  actualizarTrabajadores,
  registrar,
  modal,
  setFilterText
}) => {
  const { cargando, setCargando } = useContext(CrudContext);
  const inputFileRef = useRef(null);

  const changeHandler = (e) => {
    inputFileRef.current.click();
  };

  const excelFile = async (e) => {
    let formData = new FormData();
    formData.append("myFile", e.target.files[0]);
    setCargando(true)
    const query = await fetch(
      `${process.env.REACT_APP_BASE}/trabajador/bulk`,
      {
        method: "post",
        body: formData,
      }
    );

    const response = await query.json();
    if (response) {
      setCargando(false)
      notificacion(response.status, response.msg);
      actualizarTrabajadores();
      
    }

    inputFileRef.current.value = null;
  };
  return (
    <>
      <div className="buscador-personal">
        <input
          type="file"
          ref={inputFileRef}
          onChange={excelFile}
          style={{ display: "none" }}
          accept=".xlsx, .xls, .csv"
        />

        <Search
          placeholder="Ingresa un termino aqui..."
          onChange={(e) => setFilterText(e.target.value)}
          style={{
            width: 300,
          }}
        />
        <div className="button-container">
          {importar && (
            <Button icon={<AiOutlineVerticalAlignBottom/>} onClick={changeHandler}>Importar Trabajadores</Button>
          )}
          {registrar ? (
            <Button icon={<AiOutlineForm/>} onClick={() => abrirModal(true)}>Registrar</Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Buscador;

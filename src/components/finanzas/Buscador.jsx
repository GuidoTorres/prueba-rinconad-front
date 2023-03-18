import React from "react";
import { useContext } from "react";
import { AiOutlineSearch, AiOutlineForm } from "react-icons/ai";
import { CrudContext } from "../../context/CrudContext";
import { Button, Input } from "antd";
import "./styles/buscador.css";
const { Search } = Input;


const Buscador = ({ abrirModal, abrirReporte }) => {
  const { setFilterText, filterText, getDataById, setModal2 } =
    useContext(CrudContext);

  return (
    <div className="buscador-finanzas">
      <Search
        placeholder="Ingresa un termino aqui..."
        onChange={(e) => setFilterText(e.target.value)}
        style={{
          width: 300,
        }}
      />
      <div className="button-container">
        <Button onClick={() => setModal2(true)} icon={<AiOutlineForm />}>
          Registrar movimiento
        </Button>
        <Button onClick={() => abrirReporte(true)}>Reporte</Button>
        <Button onClick={() => abrirModal(true)}>Gráfico</Button>
      </div>
    </div>
  );
};

export default Buscador;

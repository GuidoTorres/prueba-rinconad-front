import React from "react";
import { Input, Button } from "antd";
import "./styles/buscadorHistorial.css";

const { Search } = Input;

const BuscadorContrato = ({ abrirModal, registrar, data,setFilterText }) => {

  return (
    <div className="personal-buscador">
      <Search
        placeholder="Ingresa un termino aqui..."
        onChange={(e) => setFilterText(e.target.value)}
        style={{
          width: 300,
        }}
      />
      <div className="button-container">
        <Button onClick={() => abrirModal(true)}>+ Registrar</Button>
      </div>
    </div>
  );
};

export default BuscadorContrato;

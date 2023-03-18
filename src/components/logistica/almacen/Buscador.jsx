import React from "react";
import { Input, Button, Radio } from "antd";
import { useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { AiOutlineForm } from "react-icons/ai";
import "../styles/buscadorAlmacen.css";

const { Search } = Input;

const Buscador = ({ abrirModal }) => {
  const { setFilterText } = useContext(CrudContext);

  return (
    <div className="buscador-almacen">
      <Search
        placeholder="Ingresa un almacen aqui..."
        onChange={(e) => setFilterText(e.target.value)}
        style={{
          width: 300,
        }}
      />
      <div className="button-container">
        <Button onClick={() => abrirModal(true)} icon={<AiOutlineForm />}>
          Registrar
        </Button>
      </div>
    </div>
  );
};

export default Buscador;

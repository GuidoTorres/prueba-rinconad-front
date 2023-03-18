import React, { useContext } from "react";
import { CrudContext } from "../../context/CrudContext";
import { Input, Button } from "antd";
import { AiOutlineForm } from "react-icons/ai";
import "./styles/buscador.css";
const { Search } = Input;
const BuscadorTrapiche = ({ abrirModal }) => {
  const { setFilterText } = useContext(CrudContext);
  return (
    <>
      <div className="buscador-personal">
        <Search
          placeholder="Ingresa un termino aqui..."
          onChange={(e) => setFilterText(e.target.value)}
          style={{
            width: 300,
          }}
        />
        <div className="button-container">
          <Button icon={<AiOutlineForm />} onClick={() => abrirModal(true)}>
            Registrar
          </Button>
        </div>
      </div>
    </>
  );
};

export default BuscadorTrapiche;

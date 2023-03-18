import React from "react";
import { AiOutlineForm } from "react-icons/ai";
import { useContext } from "react";
import { CrudContext } from "../../context/CrudContext";
import { Input, Button } from "antd";
import "./styles/buscadorSucursales.css";
const { Search } = Input;

const BuscadorSucursales = ({ abrirModal }) => {
  const { setFilterText } = useContext(CrudContext);

  return (
    <div className="buscador-sucursal">
      <Search
        placeholder="Ingresa un termino aqui..."
        onChange={(e) => setFilterText(e.target.value)}
        style={{
          width: 300,
        }}
      />
      <div className="button-container">
        <Button
          htmlType="submit"
          icon={<AiOutlineForm />}
          onClick={() => abrirModal(true)}
        >
          Registrar
        </Button>
      </div>
    </div>
  );
};

export default BuscadorSucursales;

import React from "react";
import { useContext } from "react";
import {  AiOutlineSearch } from "react-icons/ai";
import { CrudContext } from "../../context/CrudContext";
import { Input, Button, Radio } from "antd";
import "./styles/buscador.css"
const { Search } = Input;

const BuscadorAprobacion = ({}) => {
  const { setFilterText } = useContext(CrudContext);

  return (
    <div className="buscador-finanza">
     <Search
        placeholder="Buscar"
        onChange={(e) => setFilterText(e.target.value)}
        style={{
          width: 300,
        }}
      />

    </div>
  );
};

export default BuscadorAprobacion;

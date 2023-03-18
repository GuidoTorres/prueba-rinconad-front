import React, { useEffect } from "react";
import { useContext } from "react";
import { CrudContext } from "../../context/CrudContext";
import "./styles/buscador.css";
import { Input, Button, Radio } from "antd";
import { AiOutlineForm } from "react-icons/ai";
import { BsArrowUpShort,BsArrowDownShort } from "react-icons/bs";

import ButtonComponent from "../reusable/ButtonComponent";
const { Search } = Input;

const Buscador = ({
  abrirModal,
  abrirEntrada,
  abrirSalida,
  abrirRequerimiento,
}) => {
  const { setFilterText, filterText, getDataById, setTipo, tipo } =
    useContext(CrudContext);

  useEffect(() => {
    if (tipo === "entrada") {
      abrirEntrada(true);
    }

    if (tipo === "salida") {
      abrirSalida(true);
    }
  }, [tipo]);

  return (
    <div className="buscador-inventario">
      <Search
        placeholder="Ingresa un producto aqui"
        onChange={(e) => setFilterText(e.target.value)}
        style={{
          width: 300,
        }}
      />
      <div>
        <ButtonComponent
          text={"Registrar Producto"}
          state={abrirModal}
          icon={<AiOutlineForm />}
        />
        <ButtonComponent
          text={"Entradas"}
          state={setTipo}
          icon={<BsArrowDownShort />}
          tipo={"entrada"}
        />
        <ButtonComponent
          text={"Salidas"}
          state={setTipo}
          icon={<BsArrowUpShort />}
          tipo={"salida"}
        />
        <ButtonComponent
          text={"Requerimientos"}
          state={abrirRequerimiento}
          icon={<AiOutlineForm />}
        />
      </div>
    </div>
  );
};

export default Buscador;

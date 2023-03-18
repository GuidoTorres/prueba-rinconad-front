import React from "react";
import { useContext } from "react";
import { CrudContext } from "../../context/CrudContext";
import { Input, Button } from "antd";

const { Search } = Input;

const BuscadorRequerimiento = ({ generar, data, setFilterText }) => {
  const {  createData, multipleRequerimientos, modal, setModal } =
    useContext(CrudContext);

  const generarPedido = async () => {
    setModal(true);
  };
  
  return (
    <div className="buscador-almacen">
      <Search
        placeholder="Ingresa un..."
        onChange={(e) => setFilterText(e.target.value)}
        style={{
          width: 300,
        }}
      />
      {generar && data?.length > 0 ? (
        <div className="button-container">
          <Button onClick={() => generarPedido()}>Realizar pedido</Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default BuscadorRequerimiento;

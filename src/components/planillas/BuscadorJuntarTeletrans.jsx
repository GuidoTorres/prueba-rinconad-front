import React from "react";
import { useContext, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CrudContext } from "../../context/CrudContext";
import { PlanillaContext } from "../../context/PlanillaContext";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Input } from "antd";
const { Search } = Input;
const BuscadorJuntarTeletrans = ({ registrar }) => {
  const { pagarVarios, setPagarVarios, multiplesTeletrans } =
    useContext(PlanillaContext);
  const [sumar, setSumar] = useState(0);
  const { setFilterText } = useContext(CrudContext);
  const handleModal = () => {
    setPagarVarios(true);
  };

  useEffect(() => {
    const sumarSaldos =
      multiplesTeletrans.length > 0 &&
      multiplesTeletrans
        .map((item) => item.saldo % 4)
        .reduce((partialSum, a) => partialSum + a, 0);
    setSumar(sumarSaldos);
  }, [multiplesTeletrans]);
  return (
    <div
      className="buscador-container"
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: "-30px",
        padding: "20px 0px 0px 0px",
      }}
    >
      <Search
        placeholder="Ingresa un termino aqui..."
        onChange={(e) => setFilterText(e.target.value)}
        style={{
          width: 300,
        }}
      />
      <div
        style={{
          height: "50px",
          display: "flex",
          alignItems: "flex-end",
          gap: "5px",
        }}
      >
        <div>
          {registrar !== false &&
          multiplesTeletrans.length > 1 &&
          sumar === 4 ? (
            <Button onClick={handleModal} style={{ width: "150px" }}>
              Pagar
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default BuscadorJuntarTeletrans;

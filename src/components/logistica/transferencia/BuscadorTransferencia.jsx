import { Button } from "antd";
import { AiOutlineForm } from "react-icons/ai";
import "../styles/buscadorTransferencia.css";
import React from "react";

const BuscadorTransferencia = ({ abrirModal, realizar }) => {
  return (
    <div className="buscador-transferencia">
      {realizar ? (
        <>
          <div>
            <label htmlFor="">
              <strong>Transferencias realizadas</strong>
            </label>
          </div>

          <Button
            htmlType="submit"
            icon={<AiOutlineForm />}
            onClick={() => abrirModal(true)}
          >
            Realizar
          </Button>
        </>
      ) : (
        <div>
          <div>
            <label htmlFor="">
              <strong>Transferencias solicitadas</strong>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuscadorTransferencia;

import React from "react";
import { Alert, Space } from "antd";
import Header from "../header/Header";
import { Button, Result } from "antd";
import "./denegado.css";
import { useNavigate } from "react-router-dom";

const Denegado = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <Header
        back={false}
        text={"Acceso denegado"}
        user={"Usuario"}
        ruta={"/administracion"}
      />
      <div className="denegado">
        <Result
          status="403"
          title="403"
          subTitle="Acceso denegado, no tiene los permisos necesario para acceder a esta ruta."
          extra={
            <Button type="primary" onClick={goBack}>
              Regresar
            </Button>
          }
        />
      </div>
    </>
  );
};

export default Denegado;

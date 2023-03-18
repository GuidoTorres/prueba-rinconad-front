import React from "react";
import { Button, Result } from "antd";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }
  return (
    <>
      <Header
        back={false}
        text={"Ruta innacesible"}
        user={"Usuario"}
        ruta={"/administracion"}
      />
      <div className="denegado">
        <Result
          status="404"
          title="404"
          subTitle="Lo siento, la ruta a la que intentas acceder no existe."
          extra={<Button type="primary" onClick={goBack}>Regresar</Button>}
        />
      </div>
    </>
  );
};

export default Error;

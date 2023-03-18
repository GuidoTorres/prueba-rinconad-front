import React, { useContext } from "react";
import { AiOutlineForm } from "react-icons/ai";
import { Button } from "antd";
import "./button.css";

const ButtonComponent = ({text, state, cargando, icon, tipo}) => {
  return (
    <Button
      className="button-registrar"
      onClick={() => state(tipo || true)}
      icon={icon}
      loading={cargando ? true : false}
    >
      {text}
    </Button>
  );
};

export default ButtonComponent;

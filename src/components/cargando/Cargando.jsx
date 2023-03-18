import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Empty } from "antd";
import "./cargando.css";

const Cargando = () => {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: "#0496E6",
      }}
      spin
    />
  );
  return (
    <div className="cargando">
      <Spin indicator={antIcon} size="large" />
    </div>
  );
};

export default Cargando;

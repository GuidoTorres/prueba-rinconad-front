import { Button, Input } from "antd";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CrudContext } from "../../context/CrudContext";
import { notificacion } from "../../helpers/mensajes";
import cecomirl from "../../assets/cecomirl.jpeg";
import fondo from "../../assets/fondo-login.jpeg";

import "./login.css";
import ButtonComponent from "../reusable/ButtonComponent";

const Login = () => {
  const navigate = useNavigate();
  const {
    createData,
    setUser,
    setPermisos,
    user,
    permisos,
    cargando,
    setCargando,
  } = useContext(CrudContext);
  const [userData, setUserData] = useState("");

  const [contrasenia, setContrasenia] = useState("");

  const handleSubmit = async () => {
    let info = {
      user: userData,
      contrasenia: contrasenia,
    };

    const response = await createData(info, "auth");

    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.data?.nombre));
      localStorage.setItem(
        "permisos",
        JSON.stringify(response?.data?.rol?.permisos[0])
      );
      localStorage.setItem("firma", JSON.stringify(response.data?.foto));
      setPermisos(response?.data?.rol?.permisos);
      notificacion(response.status, response.msg);
      redirect(response?.data?.rol?.permisos);
    } else {
      notificacion(response.status, response.msg);
    }
  };

  const redirect = (permisos) => {
    if (permisos[0]?.administracion == true) {
      return navigate("/administracion");
    } else if (permisos[0]?.personal == true) {
      return navigate("/personal");
    } else if (permisos[0]?.planillas == true) {
      return navigate("/planilla");
    } else if (permisos[0]?.logistica == true) {
      return navigate("/logistica");
    } else if (permisos[0]?.finanzas == true) {
      return navigate("/finanzas");
    }
  };

  return (
    <div className="image">
      <div className="login">
        <section className="login-form">
          <div className="logo">
            <img src={cecomirl} alt="" />
          </div>
          <div className="inputs">
            <div>
              <label htmlFor="">Usuario</label>
              <Input
                className="input-form"
                name="user"
                placeholder="Usuario"
                onChange={(e) => setUserData(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Contraseña</label>

              <Input.Password
                className="input-form"
                name="contrasenia"
                placeholder="Contraseña"
                onChange={(e) => setContrasenia(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleSubmit} loading={cargando ? true : false}>
            Iniciar Sesión
          </Button>
        </section>
      </div>
    </div>
  );
};

export default Login;

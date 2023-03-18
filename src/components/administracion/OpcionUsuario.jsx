import React, { useEffect } from "react";
import { BsBriefcase, BsHouseDoor, BsPeople } from "react-icons/bs";
import MenuOpcion from "../menu-opciones/MenuOpcion";
import "./styles/opcionUsuario.css";

const OpcionUsuario = () => {
  const usuario = JSON.parse(
    localStorage.getItem("permisos")
  ).administracion_usuario;
  const rol = JSON.parse(localStorage.getItem("permisos")).administracion_rol;
  const campamento = JSON.parse(
    localStorage.getItem("permisos")
  ).administracion_campamento;
  return (
    <div className="opciones-usuario">
      {usuario ? (
        <MenuOpcion
          text={"Usuarios"}
          path={"/administracion/usuarios"}
          img={<BsPeople className="icon" />}
        />
      ) : (
        ""
      )}
      {rol ? (
        <MenuOpcion
          text={"Roles o Puestos"}
          path={"/administracion/roles"}
          img={<BsBriefcase className="icon" />}
        />
      ) : (
        ""
      )}

      {campamento ? (
        <MenuOpcion
          text={"Campamentos"}
          path={"/administracion/campamentos"}
          img={<BsHouseDoor className="icon" />}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default OpcionUsuario;

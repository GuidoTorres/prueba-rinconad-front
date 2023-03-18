import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { CrudContext } from "../../context/CrudContext";
import Header from "../header/Header";
import OpcionUsuario from "./OpcionUsuario";

const AdministracionLayout = () => {
  const { setHeader } = useContext(CrudContext);

  useEffect(() => {
    setHeader({
      back: false,
      text: "Administración",
      use: "Usuario",
    });
  }, []);

  return (
    <>
      <Header
        back={false}
        text={"Administración"}
        user={"Usuario"}
        ruta={"/administracion"}
      />
      <OpcionUsuario />
    </>
  );
};

export default AdministracionLayout;

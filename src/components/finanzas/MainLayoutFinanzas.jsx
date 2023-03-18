import React from "react";
import Header from "../header/Header";
import Opciones from "./Opciones";

const MainLayoutFinanzas = () => {
  return (
    <>
      <Header back={false} text={"Finanzas"} />
      <Opciones />
    </>
  );
};

export default MainLayoutFinanzas;

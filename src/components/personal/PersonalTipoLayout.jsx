import React from "react";
import Header from "../header/Header";
import OpcionUsuario from "./OpcionUsuario";

const PersonalTipoLayout = () => {
  return (
    <div style={{height : "100%"}}>
      <Header back={false} text={"Personal"} user={"Usuario"} />
      <OpcionUsuario/>
    </div>
  );
};

export default PersonalTipoLayout;

import React from "react";
import MenuOpcion from "../menu-opciones/MenuOpcion";
import { GrMoney } from "react-icons/gr";
import { MdOutlineHomeWork } from "react-icons/md";
import { FaTruckLoading } from "react-icons/fa";

const Opciones = () => {
  const ingresos = JSON.parse(
    localStorage.getItem("permisos")
  ).finanzas_ingreso;
  const proveedor = JSON.parse(
    localStorage.getItem("permisos")
  ).finanzas_proveedor;
  const sucursal = JSON.parse(
    localStorage.getItem("permisos")
  ).finanzas_sucursal;
  return (
    <div className="opciones-usuario">
      {ingresos ? (
        <MenuOpcion
          text={"Ingresos/egresos"}
          path={"/finanzas/saldo"}
          img={<GrMoney className="icon" />}
        />
      ) : (
        ""
      )}
      {proveedor ? (
        <MenuOpcion
          text={"Proveedores"}
          path={"/finanzas/proveedor"}
          img={<FaTruckLoading className="icon" />}
        />
      ) : (
        ""
      )}
      {sucursal ? (
        <MenuOpcion
          text={"Sucursales"}
          path={"/finanzas/sucursal"}
          img={<MdOutlineHomeWork className="icon" />}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Opciones;

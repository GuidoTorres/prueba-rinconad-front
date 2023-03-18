import React from "react";
import MenuOpcion from "../menu-opciones/MenuOpcion";
import { BiStore, BiStats, BiCategory, BiTransferAlt } from "react-icons/bi";
import { BsCardChecklist, BsBasket } from "react-icons/bs";
import { MdOutlineInventory } from "react-icons/md";

// import { IoStorefrontOutline } from "react-icons/io";

import "./styles/opcionesLayout.css";

const Opciones = () => {
  const almacen = JSON.parse(
    localStorage.getItem("permisos")
  ).logistica_almacen;
  const aprobacion = JSON.parse(
    localStorage.getItem("permisos")
  ).logistica_aprobacion;
  const categoria = JSON.parse(
    localStorage.getItem("permisos")
  ).logistica_categoria;
  const estadistica = JSON.parse(
    localStorage.getItem("permisos")
  ).logistica_estadistica;
  const inventario = JSON.parse(
    localStorage.getItem("permisos")
  ).logistica_inventario;
  const requerimiento = JSON.parse(
    localStorage.getItem("permisos")
  ).logistica_requerimiento;
  const transferencia = JSON.parse(
    localStorage.getItem("permisos")
  ).logistica_transferencia;
  return (
    <div className="opciones">
      <div>
        {almacen ? (
          <MenuOpcion
            text={"Almacenes"}
            path={"/logistica/almacen"}
            img={<BiStore className="icon" />}
          />
        ) : (
          ""
        )}
        {aprobacion ? (
          <MenuOpcion
            text={"Aprobaciones"}
            path={"/logistica/aprobacion"}
            img={<BsCardChecklist className="icon" />}
          />
        ) : (
          ""
        )}
        {categoria ? (
          <MenuOpcion
            text={"Categorías "}
            path={"/logistica/categoria"}
            img={<BiCategory className="icon" />}
          />
        ) : (
          ""
        )}

        {estadistica ? (
          <MenuOpcion
            text={"Estadísticas "}
            path={"/logistica/estadistica"}
            img={<BiStats className="icon" />}
          />
        ) : (
          ""
        )}
        {inventario ? (
          <MenuOpcion
            text={"Inventario"}
            path={"/logistica/inventario"}
            img={<MdOutlineInventory className="icon" />}
          />
        ) : (
          ""
        )}
        {requerimiento ? (
          <MenuOpcion
            text={"Requerimientos"}
            path={"/logistica/requerimiento"}
            img={<BsBasket className="icon" />}

          />
        ) : (
          ""
        )}
        {transferencia ? (
          <MenuOpcion
            text={"Transferencia "}
            path={"/logistica/transferencia"}
            img={<BiTransferAlt className="icon" />}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Opciones;

import React, { useEffect, useState } from "react";
import { SidebarData } from "../../data/sidebarData";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CrudContext } from "../../context/CrudContext";
import image from "../../assets/cecomirl.jpeg";

import "./sidebar.css";
import { Tooltip } from "antd";

const Sidebar = () => {
  const { setSidebar, sidebar } = useContext(CrudContext);
  const [side, setSide] = useState();

  const responsive = () => {
    setSidebar((state) => !state);
  };

  const administracion = JSON.parse(
    localStorage.getItem("permisos")
  ).administracion;
  const logistica = JSON.parse(localStorage.getItem("permisos")).logistica;
  const finanzas = JSON.parse(localStorage.getItem("permisos")).finanzas;
  const planillas = JSON.parse(localStorage.getItem("permisos")).planillas;
  const personal = JSON.parse(localStorage.getItem("permisos")).personal;

  const filterSidebar = () => {
    const array = [];
    let admin;
    let perso;
    let plani;
    let log;
    let fina;
    if (administracion) {
      admin = SidebarData[0];
    } else {
      admin = null;
    }
    if (personal) {
      perso = SidebarData[1];
      array.push([SidebarData[1]]);
    } else {
      perso = null;
    }
    if (planillas) {
      plani = SidebarData[2];
    } else {
      plani = null;
    }

    if (logistica) {
      log = SidebarData[3];
    } else {
      log = null;
    }
    if (finanzas) {
      fina = SidebarData[4];
    } else {
      fina = null;
    }

    array.push(admin, perso, plani, log, fina);
    const remove = array.splice(1).filter((item) => item !== null);
    setSide(remove);
  };

  useEffect(() => {
    filterSidebar();
  }, []);

  return (
    <div className="sidebar-container">
      <section>
        <div
          className={sidebar ? "sidebar-logo" : "sidebar-logo-responsive"}
          onClick={responsive}
        >
          <img src={image} />
        </div>
        <div
          className={sidebar ? "sidebar-areas " : "sidebar-areas-responsive"}
        >
          <ul>
            {side?.map((item, i) => {
              return (
                <Tooltip placement="right" title={item.title} key={i}>
                  <li >
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "activo" : "inactivo"
                      }
                      key={i}
                      to={item.path}
                    >
                      <span>
                        {item.icon}
                        <label htmlFor="">{item.title}</label>
                      </span>
                    </NavLink>
                  </li>
                </Tooltip>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;

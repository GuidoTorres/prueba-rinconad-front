import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
// import { AdminContext } from "../../context/AdminContext";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./header.css";
import { CrudContext } from "../../context/CrudContext";
import { Button, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";

const Header = ({ back, text, user1, ruta }) => {
  const navigate = useNavigate();
  const { setPermisos, permisos } = useContext(CrudContext);

  const cerrarSesion = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("permisos");
    setPermisos([]);
    navigate("/");
  };
  return (
    <div className="header-container">
      <div className="header-div">
        <div className="header-role">
          {text && back !== false ? (
            <Link className="link" to={ruta}>
              <AiOutlineArrowLeft className="back" />
            </Link>
          ) : null}
          <label htmlFor="">{text}</label>
        </div>
        <div className="header-user">
          <label htmlFor="">{JSON.parse(localStorage.getItem("user"))}</label>
          <Popover
            placement="bottomRight"
            title="Administrador"
            content={<label onClick={cerrarSesion}>Cerrar sesión</label>}
            trigger="click"
          >
            <Avatar size="default" icon={<UserOutlined />} />
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Header;

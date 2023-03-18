import React, { useContext, useEffect, useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import ModalAsignarRol from "./ModalAsignarRol";
import Buscador from "../Buscador";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import useSearch from "../../../hooks/useSearch";
import { rolLayout } from "../../../data/dataTable";
import ModalPermisos from "../usuarios/ModalPermisos";
import { notificacion } from "../../../helpers/mensajes";

const RolLayout = () => {
  const route = "rol";
  const {
    getData,
    deleteData,
    modal,
    setModal,
    setDataToEdit,
    setModal1,
    modal1,
  } = useContext(CrudContext);
  const [roles, setRoles] = useState([]);
  const { result } = useSearch(roles);

  const getRoles = async () => {
    const response = await getData(route);
    setRoles(response.data);
  };

  const handleEdit = (e) => {
    setDataToEdit(e);
    setModal(true);
  };
  const handlePermisos = (e) => {
    setModal1(true);
    setDataToEdit(e);
  };

  const handleDelete = async (id) => {
    const response = await deleteData(route, id);
    if (response) {
      notificacion(response.status, response.msg);
      getRoles();
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  const columns = rolLayout(handleEdit, handleDelete, handlePermisos);

  return (
    <>
      <Header text={"Roles"} user={"Usuario"} ruta={"/administracion"} />
      <div className="margenes">
        <Buscador abrirModal={setModal} />
        <Tabla columns={columns} table={result} />
      </div>
      {modal && <ModalAsignarRol actualizarTabla={getRoles} />}
      <ModalPermisos open={modal1} />
    </>
  );
};

export default RolLayout;

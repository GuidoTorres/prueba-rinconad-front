import React, { useContext, useEffect, useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import ModalUsuario from "./ModalUsuario";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import { usuario } from "../../../data/dataTable";
import useSearch from "../../../hooks/useSearch";
import ModalPermisos from "./ModalPermisos";
import { notificacion } from "../../../helpers/mensajes";
import { Empty } from "antd";
import Cargando from "../../cargando/Cargando";

const UsuarioLayout = () => {
  const route = "usuario";

  const {
    getData,
    deleteData,
    modal,
    setModal,
    setDataToEdit,
    modal1,
    cargando,
    setCargando,
  } = useContext(CrudContext);
  const [usuarios, setUsuarios] = useState([]);
  const { result } = useSearch(usuarios);
  const getUsuarios = async () => {
    setCargando(true);
    const response = await getData(route);

    if (response) {
      setCargando(false);
      setUsuarios(response.data);
    }
  };
  const handleEdit = (e) => {
    setDataToEdit(e);
    setModal(true);
  };

  const handleDelete = async (id) => {
    const response = await deleteData("usuario", id);
    if (response) {
      notificacion(response.status, response.msg);
      getUsuarios();
    }
  };
  useEffect(() => {
    getUsuarios();
  }, []);

  const columns = usuario(handleEdit, handleDelete);


  return (
    <>
      <Header text={"Usuarios"} user={"Usuario"} ruta={"/administracion"} />
      <div className="margenes">
        <Buscador abrirModal={setModal} />

        {usuarios.length > 0 ? (
          <Tabla columns={columns} table={result} />
        ) : (
          <div className="noData">
            {cargando ? (
              <Cargando/>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<span>No hay registros para mostrar.</span>}
              />
            )}
          </div>
        )}
      </div>
      {modal && <ModalUsuario actualizarTabla={getUsuarios} />}
      {modal1 && <ModalPermisos actualizar={getUsuarios} />}
    </>
  );
};

export default UsuarioLayout;

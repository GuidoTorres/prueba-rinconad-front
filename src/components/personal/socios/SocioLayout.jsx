import React, { useState, useEffect, useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import ModalRegistroSocio from "./ModalRegistroSocio";
import { socioLayout } from "../../../data/dataTable";
import useSearch from "../../../hooks/useSearch";
import { notificacion } from "../../../helpers/mensajes";
import { Empty } from "antd";

const SocioLayout = () => {
  const route = "socio";

  const { getData, deleteData, modal, setModal, setDataToEdit } =
    useContext(CrudContext);
  const [socios, setSocios] = useState([]);
  const { result } = useSearch(socios);

  const getSocios = async () => {
    const response = await getData(route);
    setSocios(response.data);
  };

  const handleEdit = (e) => {
    setDataToEdit(e);
    setModal(true);
  };

  const handleDelete = async (e) => {
    const response = await deleteData(route, e);
    if (response) {
      notificacion(response.status, response.msg);
      getSocios();
    }
  };

  useEffect(() => {
    getSocios();
  }, []);

  const columns = socioLayout(handleEdit, handleDelete);
  return (
    <>
      <Header text={"Socios"} user={"Usuario"} ruta={"/personal"} />
      <div className="margenes">
        <Buscador abrirModal={setModal} registrar={true} />

        {result?.length > 0 ? (
        <Tabla columns={columns} table={result} />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No hay registros para mostrar.</span>}
          />
        )}
      </div>

      {modal && <ModalRegistroSocio actualizarTabla={getSocios} />}
    </>
  );
};

export default SocioLayout;

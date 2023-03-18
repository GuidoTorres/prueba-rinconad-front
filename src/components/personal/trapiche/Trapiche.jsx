import React, { useContext, useEffect, useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { trapicheLayout } from "../../../data/dataTable";
import { notificacion } from "../../../helpers/mensajes";
import useSearch from "../../../hooks/useSearch";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import BuscadorTrapiche from "../BuscadorTrapiche";
import ModalTrapiche from "./ModalTrapiche";

const Trapiche = () => {
  const { getData, modal, setModal, setDataToEdit, deleteData } =
    useContext(CrudContext);
  const [trapiches, setTrapiches] = useState([]);
  const { result } = useSearch(trapiches);

  const getTrapiche = async () => {
    const response = await getData("trapiche");
    setTrapiches(response.data);
  };
  useEffect(() => {
    getTrapiche();
  }, []);

  const handleEdit = (e) => {
    setDataToEdit(e);
    setModal(true);
  };

  const handleDelete = async (e) => {
    const response = await deleteData("trapiche", e);
    if (response) {
      notificacion(response.status, response.msg);
      getTrapiche();
    }
  };

  const columns = trapicheLayout(handleEdit, handleDelete);
  return (
    <>
      <Header text={"Trapiches"} user={"Usuario"} ruta={"/personal"} />
      <div className="margenes">
        <BuscadorTrapiche abrirModal={setModal} />
        <Tabla columns={columns} table={result} />
      </div>

      {modal && <ModalTrapiche actualizarTabla={getTrapiche} />}
    </>
  );
};

export default Trapiche;

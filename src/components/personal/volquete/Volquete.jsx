import React, { useContext, useEffect, useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { volqueteLayout } from "../../../data/dataTable";
import { notificacion } from "../../../helpers/mensajes";
import useSearch from "../../../hooks/useSearch";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import BuscadorTrapiche from "../BuscadorTrapiche";
import ModalVolquete from "./ModalVolquete";

const Volquete = () => {
  const { getData, modal, setModal, setDataToEdit, deleteData } = useContext(CrudContext);
  const [volquete, setVolquete] = useState([]);
  const {result} = useSearch(volquete)

  const getVolquetes = async () => {
    const response = await getData("volquete");
    setVolquete(response.data);
  };

  useEffect(() => {
    getVolquetes();
  }, []);

  const handleEdit = (e) => {
    setDataToEdit(e);
    setModal(true);
  };

  const handleDelete = async (e) => {
    const response = await deleteData("volquete", e);
    if (response) {
      notificacion(response.status, response.msg);
      getVolquetes();
    }
  };

  const columns = volqueteLayout(handleEdit, handleDelete);

  return (
    <>
      <Header text={"Volquetes"} user={"Usuario"} ruta={"/personal"} />
      <div className="margenes">
        <BuscadorTrapiche abrirModal={setModal} />
        <Tabla columns={columns} table={result} />
      </div>

      {modal && <ModalVolquete actualizarTabla = {getVolquetes}/>}
    </>
  );
};

export default Volquete;

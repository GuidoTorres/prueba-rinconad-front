import React, { useContext, useEffect, useState } from "react";
import Buscador from "../Buscador";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import { CrudContext } from "../../../context/CrudContext";
import ModalCampamento from "./ModalCampamento";
import useSearch from "../../../hooks/useSearch";
import { campamentoLayout } from "../../../data/dataTable";
import { notificacion } from "../../../helpers/mensajes";

const CampamentoLayout = () => {
  const route = "campamento";

  const { getData, deleteData, modal, setModal, setDataToEdit } =
    useContext(CrudContext);
  const [campamentos, setCampamentos] = useState([]);
  const { result } = useSearch(campamentos);
  const getCampamento = async () => {
    const response = await getData(route);
    setCampamentos(response.data);
  };

  useEffect(() => {
    getCampamento();
  }, []);

  const handleEdit = (e) => {
    setDataToEdit(e);
    setModal(true);
  };

  const handleDelete = async (id) => {
    const response = await deleteData(route, id);
    if (response.status === 200) {
      notificacion("success", response.msg);
      getCampamento();
    }
  };

  const columns = campamentoLayout(handleEdit, handleDelete);

  return (
    <>
      <Header text={"Campamentos"} user={"Usuario"} ruta={"/administracion"} />
      <div className="margenes">
      <Buscador abrirModal={setModal} />

      <Tabla columns={columns} table={result} />
      </div>
      {modal && <ModalCampamento actualizarTabla={getCampamento} />}
    </>
  );
};

export default CampamentoLayout;

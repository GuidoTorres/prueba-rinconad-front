import { Empty } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { categoriaLayout } from "../../../data/dataTable";
import { notificacion } from "../../../helpers/mensajes";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import BuscadorEntradaSalida from "../BuscadorEntradaSalida";
import ModalRegistrarCategoria from "./ModalRegistrarCategoria";

const CategoriaLayout = () => {
  const { getData, modal, setModal, setDataToEdit, deleteData } =
    useContext(CrudContext);
  const [categoria, setCategoria] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [search, setSearch] = useState([]);

  const getCategorias = async () => {
    const route = "categoria";
    const response = await getData(route);
    setCategoria(response.data);
  };

  useEffect(() => {
    getCategorias();
  }, []);

  const handleEdit = (e) => {
    setDataToEdit(e);
    setModal(true);
  };

  useEffect(() => {
    if (filterText !== "") {
      const filter = categoria.filter((item) =>
        item?.descripcion?.toLowerCase()?.includes(filterText.toLowerCase())
      );

      setSearch(filter);
    } else {
      setSearch(categoria);
    }
  }, [filterText, categoria]);

  const handleDelete = async (e) => {
    const route = "categoria";
    const response = await deleteData(route, e.id);
    if (response) {
      notificacion(response.status, response.msg);
      getCategorias();
    }
  };

  const columns = categoriaLayout(handleEdit, handleDelete);

  return (
    <>
      <Header text={"Categorías"} user={"Usuario"} ruta={"/logistica"} />
      <div className="margenes">
        <BuscadorEntradaSalida
          abrirModal={setModal}
          categoria={true}
          filterText={setFilterText}
        />

        <Tabla columns={columns} table={search} />
      </div>
      {modal && <ModalRegistrarCategoria actualizarTabla={getCategorias} />}
    </>
  );
};

export default CategoriaLayout;

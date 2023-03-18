import React, { useContext, useEffect, useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import ModalRegistrarEmpresa from "./ModalRegistrarEmpresa";
import ModalHistorialContrato from "./ModalHistorialContrato";
import { empresaLayout } from "../../../data/dataTable";
import { notificacion } from "../../../helpers/mensajes";
import useSearch from "../../../hooks/useSearch";
import { Empty } from "antd";

const EmpresaLayout = () => {
  const route = "empresa";

  const {
    getData,
    deleteData,
    setModal,
    modal,
    setModal1,
    modal1,
    setModal2,
    modal2,
    setDataToEdit,
  } = useContext(CrudContext);
  const [empresas, setEmpresas] = useState([]);
  const [id, setId] = useState("");
  const [modalRegistrarEmpresa, setModalREgistraEmpres] = useState(false);
  const [modalHistorial, setModalHistorial] = useState(false);

  const { result } = useSearch(empresas);

  const getEmpresa = async () => {
    const response = await getData(route);
    setEmpresas(response.data);
  };

  const handleEdit = (e) => {
    setDataToEdit(e);
    setModalREgistraEmpres(true);
  };

  const handleDelete = async (e) => {

    const response = await deleteData("empresa", e);
    if (response) {
      notificacion(response.status, response.msg);
      getEmpresa();
    }
  };

  useEffect(() => {
    getEmpresa();
  }, []);

  const handleContrato = (e) => {
    setModalHistorial(true);
    setId(e);
  };

  const columns = empresaLayout(handleContrato, handleEdit, handleDelete);

  return (
    <>
      <Header text={"Empresas"} user={"Usuario"} ruta={"/personal"} />
      <div className="margenes">
        <Buscador abrirModal={setModalREgistraEmpres} registrar={true} />

        {result?.length > 0 ? (
          <Tabla columns={columns} table={result} />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No hay registros para mostrar.</span>}
          />
        )}
      </div>

      {modalRegistrarEmpresa && (
        <ModalRegistrarEmpresa
          actualizarTabla={getEmpresa}
          modal={modalRegistrarEmpresa}
          setModal={setModalREgistraEmpres}
        />
      )}
      {modalHistorial && (
        <ModalHistorialContrato
          selected={id}
          modal1={modalHistorial}
          setModal1={setModalHistorial}
        />
      )}
    </>
  );
};

export default EmpresaLayout;

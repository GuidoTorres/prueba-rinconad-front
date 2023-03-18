import React, { useContext, useEffect, useState } from "react";
import Tabla from "../../tabla/Tabla";
import BuscadorEvaluacion from "../BuscadorEvaluacion";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrash2Fill, BsPencil, BsTrash } from "react-icons/bs";
import "../styles/modalHistorialContrato.css";
import { CrudContext } from "../../../context/CrudContext";
import ModalContratoAsociacion from "./ModalContratoAsociacion";
import { notificacion } from "../../../helpers/mensajes";
import MainModal from "../../modal/MainModal";
import { Empty, Popconfirm, Tag } from "antd";

const ModalHistorialContratoAsociacion = ({
  selected,
  evaluaciones,
  actualizarAsociacion,
  modal1,
  setModal1,
}) => {
  const {
    getDataById,
    deleteData,
    data1,
    setData1,
    getData,
    setDataToEdit,
    modal2,
    setModal2,
  } = useContext(CrudContext);
  const [id, setId] = useState("");
  const [modalContrato, setModalContrato] = useState(false);

  const getContrato = async () => {
    const route = `contrato/asociacion/${selected.id}`;
    const response = await getData(route);
    setData1(response.data);
  };

  const handleEdit = (e) => {
    setDataToEdit(e);
    setModalContrato(true);
    setId(e);
  };

  const handleDelete = async (id) => {
    let route = "contrato";
    const response = await deleteData(route, id.id);
    if (response) {
      notificacion(response.status, response.msg);
      getContrato();
    }
  };

  const closeModal = () => {
    setModal1(false);
    setDataToEdit(null);
  };

  useEffect(() => {
    getContrato();
  }, []);

  const historialContrato = [
    {
      id: "Id ",
      name: "Id",
      width: "80px",
      selector: (row) => row?.id,
    },
    {
      id: "Tipo de Contrato",
      name: "Tipo de Contrato",
      width: "18%",
      selector: (row) => row?.tipo_contrato,
    },
    {
      id: "Fecha de inicio",
      name: "Fecha de inicio",
      width: "16%",
      selector: (row) => row?.fecha_inicio?.split("T")[0],
    },
    {
      id: "Fecha de fin",
      name: "Fecha de fin",
      selector: (row) => row?.fecha_fin?.split("T")[0],
    },
    {
      id: "Estado",
      name: "Estado",
      selector: (row) =>
        row?.finalizado ? (
          <Tag color="green">Finalizado</Tag>
        ) : (
          <Tag color="blue">Activo</Tag>
        ),
    },
    {
      id: "Nota",
      name: "Nota",
      selector: (row) => row?.nota_contrato,
    },
    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <>
          <div className="acciones">
            <BsPencil onClick={() => handleEdit(e)} />
            <Popconfirm
              title="Eliminar trabajador"
              description="¿Estas seguro de eliminar?"
              onConfirm={() => handleDelete(e)}
              // onCancel={cancel}
              okText="Si"
              cancelText="No"
              placement="topRight"
            >
              <BsTrash />
            </Popconfirm>
          </div>
        </>
      ),
    },
  ];
  return (
    <MainModal
      title={"Historial de contratos"}
      open={modal1}
      width={900}
      closeModal={closeModal}
    >
      <BuscadorEvaluacion abrirModal={setModalContrato} registrar={true} />

      {data1.length > 0 ? (
        <section className="tabla">
          <Tabla columns={historialContrato} table={data1} />
        </section>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span>No hay registros para mostrar.</span>}
        />
      )}

      {modalContrato && (
        <ModalContratoAsociacion
          actualizarTabla={getContrato}
          selected={id}
          data={selected}
          evaluaciones={evaluaciones}
          actualizarAsociacion={actualizarAsociacion}
          modal2={modalContrato}
          setModal2={setModalContrato}
          dataContrato={data1}
        />
      )}
    </MainModal>
  );
};

export default ModalHistorialContratoAsociacion;

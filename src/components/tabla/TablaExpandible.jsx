import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./tabla.css";
import {
  AiFillEdit,
  AiFillEye,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { BsFillTrash2Fill, BsPencil, BsTrash } from "react-icons/bs";
import ModalRegistroPersonal from "../personal/trabajadores/ModalRegistroPersonal";
import { CrudContext } from "../../context/CrudContext";
import ModalHistorialEvaluacion from "../personal/trabajadores/ModalHistorialEvaluacion";
import { notificacion } from "../../helpers/mensajes";
import { Empty, Image, Popconfirm } from "antd";
import { BiBold } from "react-icons/bi";

const Tabla = ({ columns, table, actualizarTabla }) => {
  const route = "trabajador";
  const {
    deleteData,
    updateData,
    setData,
    setModal,
    setModal1,
    modal,
    modal1,
    setDataToEdit,
  } = useContext(CrudContext);
  const [id, setId] = useState("");

  const handleEdit = (e) => {
    setDataToEdit(e);
    setModal(true);
  };

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  const handleDelete = async (e) => {
    const response = await deleteData(route, e);
    if (response) {
      notificacion(response.status, response.msg);
      actualizarTabla();
    }
  };
  const handleEvaluacion = (e) => {
    setModal1(true);
    setId(e);
  };
  const personal = [
    {
      id: "codigo",
      name: "Código",
      sortable: true,
      center: true,
      width: "100px",
      selector: (row) => row?.codigo_trabajador,
    },
    {
      id: "foto",
      name: "Foto",
      center: true,
      width: "120px",

      selector: (row) => (
        <div style={{ padding: "8px" }}>
          <Image
            visible={false}
            src={row?.foto || "https://via.placeholder.com/60"}
            style={{
              height: "60px",
              width: "60px",
              borderRadius: "10%",
            }}
          />
        </div>
      ),
    },
    {
      id: "Trabajador",
      name: "Trabajador",
      selector: (row) =>
        row?.nombre + " " + row?.apellido_paterno + " " + row?.apellido_materno,
      width: "300px",
      sortable: true,
    },
    {
      id: "Campamento",
      name: "Campamento",
      selector: (row) => (!row?.campamento ? "Por asignar" : row?.campamento),
      sortable: true,
    },
    {
      id: "Dni",
      name: "Dni",
      selector: (row) => row?.dni,
      sortable: true,
    },
    {
      id: "telefono",
      name: "Telefono",
      selector: (row) => row?.telefono,
      sortable: true,
    },

    {
      id: "Evaluación",
      name: "Evaluación",
      selector: (row) => row?.id,

      button: true,
      cell: (e, index) => (
        <>
          <AiFillEye onClick={() => handleEvaluacion(e)} />
          {e?.evaluacions?.fiscalizador_aprobado === "si" &&
          e?.evaluacions?.control === "si" &&
          e?.evaluacions?.topico === "si" &&
          e?.evaluacions?.seguridad === "si" &&
          e?.evaluacions?.medio_ambiente === "si" &&
          e?.evaluacions?.recursos_humanos === "si" &&
          !e?.evaluacions?.finalizado ? (
            <AiOutlineCheck
              style={{ color: "green", fontWeigth: "bold", fontSize: "16px" }}
            />
          ) : e?.evaluacions?.id && !e?.evaluacions?.finalizado ? (
            <AiOutlineClose
              style={{ color: "red", fontWeigth: "bold", fontSize: "16px" }}
            />
          ) : (
            ""
          )}
        </>
      ),
    },

    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <div className="acciones">
          <BsPencil onClick={() => handleEdit(e)} />
          <Popconfirm
            title="Eliminar trabajador"
            description="¿Estas seguro de eliminar?"
            onConfirm={() => handleDelete(e.dni)}
            // onCancel={cancel}
            okText="Si"
            cancelText="No"
            placement="topRight"
          >
            <BsTrash />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const conditionalRowStyles = [
    {
      when: (row) => row?.contrato,
      style: (row) => ({
        backgroundColor: row?.contrato?.length > 0 ? "#87b07bf6" : "",
        fontSize: "15px",
        // color: 'white',
        // '&:hover': {
        //   cursor: 'pointer',
        // },
      }),
    },
  ];

  const expandedComponent = ({ data }) => (
    <div style={{ padding: "5px 5px 5px 5px", backgroundColor: "#DFE4E4" }}>
      <DataTable
        columns={personal}
        data={data.trabajador}
        pagination
        paginationPerPage={6}
        noDataComponent={
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No hay registros para mostrar.</span>}
          />
        }
        paginationComponentOptions={paginationComponentOptions}
        paginationRowsPerPageOptions={[6, 10, 15, 20]}
      />
    </div>
  );

  return (
    <div className="table-container">
      <DataTable
        columns={columns}
        data={table}
        pagination
        fixedHeader
        striped
        expandableRows
        expandableRowsComponent={expandedComponent}
        expandableRowDisabled={(row) =>
          row?.trabajador?.length === 0 ? true : false
        }
        paginationComponentOptions={paginationComponentOptions}
        responsive
        noHeader={true}
        noDataComponent={"No se encontraron resultados."}
        conditionalRowStyles={conditionalRowStyles}
      />

      {modal && <ModalRegistroPersonal actualizarTabla={actualizarTabla} />}
      {modal1 && (
        <ModalHistorialEvaluacion
          selected={id}
          actualizarTrabajador={actualizarTabla}
        />
      )}
    </div>
  );
};

export default Tabla;

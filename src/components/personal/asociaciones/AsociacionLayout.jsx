import React, { useContext, useEffect, useRef, useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import Header from "../../header/Header";
import Tabla from "../../tabla/TablaExpandible";
import Buscador from "../Buscador";
import ModalRegistrarAsociacion from "./ModalRegistrarAsociacion";
import ModalHistorialContratoAsociacion from "./ModalHistorialContratoAsociacion";
import { asociacionLayout } from "../../../data/dataTable";
import { notificacion } from "../../../helpers/mensajes";
import Cargando from "../../cargando/Cargando";
import { Empty } from "antd";

const AsociacionLayout = () => {
  const route = "asociacion";
  const inputFileRef = useRef(null);

  const {
    getData,
    deleteData,
    data,
    setData,
    filterText,
    setDataToEdit,
    modal,
    setModal,
    modal1,
    setModal1,
    cargando,
    setCargando,
  } = useContext(CrudContext);
  const [asociacionId, setAsociacionId] = useState();
  const [id, setId] = useState("");
  const [search, setSearch] = useState([]);
  const [asociaciones, setAsociaciones] = useState([]);
  const [registrarAsociacion, setRegistrarAsociacion] = useState(false);
  const [registrarContratoAsociacion, setContratoAsociacion] = useState(false);

  const getAsociaciones = async () => {
    setCargando(true);
    const response = await getData(route);

    if (response) {
      setAsociaciones(response.data);
      setCargando(false);
    }
  };

  useEffect(() => {
    getAsociaciones();
  }, []);

  const handleEdit = (e) => {
    setDataToEdit(e);
    setRegistrarAsociacion(true);
  };

  const handleDelete = async (e) => {
    const response = await deleteData(route, e);
    if (response) {
      notificacion(response.status, response.msg);
      getAsociaciones();
    }
  };

  useEffect(() => {
    const filtered =
      asociaciones &&
      asociaciones
        .map((item) => [
          {
            codigo: item?.codigo,
            id: item?.id,
            nombre: item?.nombre,
            campamento: item?.campamento,
            tipo: item?.tipo,
            contrato: item?.contrato,
            trabajador:
              item &&
              item?.trabajadors &&
              item?.trabajadors?.filter(
                (prueba) =>
                  prueba?.nombre
                    ?.toLowerCase()
                    ?.includes(filterText.toLowerCase()) ||
                  prueba?.apellido_paterno
                    ?.toLowerCase()
                    ?.includes(filterText.toLowerCase()) ||
                  prueba?.apellido_materno
                    ?.toLowerCase()
                    ?.includes(filterText.toLowerCase())
              ),
          },
        ])
        .flat();
    setSearch(filtered);

    if (filterText) {
      const filtered2 =
        filtered &&
        filtered.filter(
          (item) =>
            item?.nombre?.toLowerCase()?.includes(filterText.toLowerCase()) ||
            item?.trabajador?.length
        );
      setSearch(filtered2);
    }
  }, [filterText, asociaciones]);

  const changeHandler = (e) => {
    inputFileRef.current.click();

    setAsociacionId(e.id);
  };

  const excelFile = async (e) => {
    let formData = new FormData();
    formData.append("myFile", e.target.files[0]);

    const postExcel = await fetch(
      `${process.env.REACT_APP_BASE}/asociacion/upload/${asociacionId}`,
      {
        method: "post",
        body: formData,
      }
    );
    const response = await postExcel.json();

    if (response) {
      notificacion(response.status, response.msg);
      getAsociaciones();
    }

    inputFileRef.current.value = null;
  };

  const handleContrato = (e) => {
    setContratoAsociacion(true);
    setId(e);
  };

  const columns = asociacionLayout(
    changeHandler,
    handleContrato,
    handleEdit,
    handleDelete
  );

  return (
    <>
      <input
        type="file"
        ref={inputFileRef}
        onChange={excelFile}
        style={{ display: "none" }}
        accept=".xlsx, .xls, .csv"
      />
      <Header text={"Asociaciones"} user={"Usuario"} ruta={"/personal"} />
      <div className="margenes">
        <Buscador abrirModal={setRegistrarAsociacion} registrar={true} />

        {asociaciones.length > 0 ? (
          <Tabla
            columns={columns}
            table={search}
            actualizarTabla={getAsociaciones}
          />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No hay registros para mostrar.</span>}
          />
        )}
      </div>

      {registrarAsociacion && (
        <ModalRegistrarAsociacion
          actualizarTabla={getAsociaciones}
          modal={registrarAsociacion}
          setModal={setRegistrarAsociacion}
        />
      )}
      {registrarContratoAsociacion && (
        <ModalHistorialContratoAsociacion
          selected={id}
          evaluaciones={data}
          actualizarAsociacion={getAsociaciones}
          modal1={registrarContratoAsociacion}
          setModal1={setContratoAsociacion}
        />
      )}
    </>
  );
};

export default AsociacionLayout;

import React, { useContext, useEffect, useState } from "react";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import { PlanillaContext } from "../../../context/PlanillaContext";
import { CrudContext } from "../../../context/CrudContext";
import { crearAsistencia } from "../../../data/dataTable";
import "../style/modalCrearAsistencia.css";
import MainModal from "../../modal/MainModal";
import { Empty } from "antd";
import Cargando from "../../cargando/Cargando";
import { notificacion } from "../../../helpers/mensajes";

const ModalCrearAsistencia = ({ data, actualizarTabla, fechas }) => {
  const { setControlAsistencia, fechaId } = useContext(PlanillaContext);
  const {
    getData,
    data2,
    setData2,
    createData,
    updateData,
    modal,
    dataToEdit,
    setDataToEdit,
    setModal,
    cargando,
    setCargando,
  } = useContext(CrudContext);

  const [id, setId] = useState("");

  const filtrarFechaId = () => {
    const prueba = fechas && fechas?.filter((item) => item?.fecha == data);
    const id = prueba && prueba?.at(-1)?.id;
    if (id) {
      setId(id);
    }
  };

  useEffect(() => {
    filtrarFechaId();
  }, [data, fechas]);

  const getTrabajadorAsistencia = async () => {
    const route = `asistencia/trabajador/${id}`;
    const response = await getData(route);
    setData2(response.data);
  };
  useEffect(() => {
    if(id){

      getTrabajadorAsistencia();
    }
  }, [id]);

  const closeModal = () => {
    setModal(false);
    setData2([]);
  };

  const handleAsistencia = async (event, e) => {
    const route = "asistencia/trabajador";
    const info = {
      asistencia_id: id,
      trabajador_id: e.dni,
      asistencia: event.target.value,
    };
    const response = await createData(info, route);
    if (response) {
      notificacion(response.status, "Actualizado con éxito!");
      actualizarTabla();
    }
  };

  const handleIngreso = async (e) => {
    const route = "asistencia/hora_ingreso";
    let obj = {
      hora_ingreso: e.target.value,
    };

    const response = await updateData(obj, data.id, route);
    if (response.status === 200) {
      actualizarTabla();
    }
  };

  const columns = crearAsistencia(handleAsistencia);
  return (
    <MainModal
      className={"modal-asistencia"}
      title={dataToEdit ? "Editar asistencia" : "Registrar asistencia"}
      open={modal}
      width={800}
      closeModal={closeModal}
    >
      <div className="hora-ingreso">
        <div>
          <label htmlFor="">Hora de ingreso: </label>
          <input
            type="time"
            name="hora_ingreso"
            defaultValue={data?.hora_ingreso || "07:00"}
            onChange={handleIngreso}
          />
        </div>
        <Buscador
          registrar={false}
          crear={false}
          exportar={false}
          cargar={true}
          // actualizar={actualizarTabla}
          // actualizarTabla={getTrabajadorAsistencia}
        />
      </div>
      <br />
      {data2?.length > 0 ? (
        <Tabla columns={columns} table={data2} />
      ) : (
        <div className="noData">
          {cargando ? (
            <Cargando />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span>No hay registros para mostrar.</span>}
            />
          )}
        </div>
      )}
    </MainModal>
  );
};

export default ModalCrearAsistencia;

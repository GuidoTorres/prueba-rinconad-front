import { Col, Empty, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineForm } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { PlanillaContext } from "../../../context/PlanillaContext";
import { pagosLayout } from "../../../data/dataTable";
import { notificacion } from "../../../helpers/mensajes";
import ButtonAdd from "../../Button/ButtonAdd";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import BuscadorControlPlanilla from "../BuscadorControlPlanilla";
import ModalJuntarTeletrans from "../control/ModalJuntarTeletrans";
import ModalPagosIndividual from "./ModalPagosIndividual";

const PagosLayout = () => {
  const { getData, createData } = useContext(CrudContext);
  // const { juntarTeletrans, setJuntarTeletrans } = useContext(PlanillaContext);
  const [pagos, setPagos] = useState([]);

  const [openModalIndivudual, setOpenModalIndivudual] = useState(false);

  const handleOpenModalIndivudual = () => {
    setOpenModalIndivudual(true);
  };
  const handleCloseModalIndivudual = () => {
    setOpenModalIndivudual(false);
  };

  const [openModalAsociacion, setOpenModalAsociacion] = useState(false);

  const handleOpenModalAsociacion = () => {
    setOpenModalAsociacion(true);
  };
  const handleCloseModalAsociacion = () => {
    setOpenModalAsociacion(false);
  };

  const [dataPagos, setDataPagos] = useState({
    observacion: "",
    fecha_pago: "",
    contrato_id: "",
    id: "",
    teletrans: "",
  });

  console.log(pagos);

  const getPagos = async () => {
    const response = await getData("planilla/pagos");

    if (response) {
      const filterNull = response.data.filter((item) => item !== null);
      setPagos(filterNull);
    }
  };

  useEffect(() => {
    getPagos();
  }, []);

  const handleData = (event, e, i) => {
    const { name, value } = event.target;

    setPagos((state) =>
      state.map((item, index) =>
        index === i
          ? {
              ...item,
              [name]: value,
              contrato_id: e?.contrato_id,
              id: e?.pagos?.pagos?.at(-1)?.id || "",
            }
          : item
      )
    );
  };

  const postPagos = async (e) => {
    console.log(e);
    const info = {
      id: e.pago_id || "",
      contrato_id: e.contrato_id,
      observacion: e.observacion,
      fecha_pago: e.fecha_pago,
      teletrans: e.teletrans,
    };

    const response = await createData(info, "pago/programacion");

    if (response) {
      notificacion(response.status, response.msg);
      getPagos();
    }
  };

  const columns = pagosLayout(handleData, postPagos);

  return (
    <>
      <Header text={"Programación de pagos"} ruta={"/planilla"} />
      <div className="margenes">
        <Row align="middle">
          <Col span={12}></Col>
          <Col span={12} align="end">
            {/* <ButtonAdd
							title="Crear Pago Individual"
							onClick={handleOpenModalIndivudual}
							icon={<AiOutlineForm />}
						/>
						<ButtonAdd
							title="Crear Pago Asociación"
							onClick={() => {}}
							icon={<AiOutlineForm />}
						/> */}
          </Col>
        </Row>
        {pagos?.length > 0 ? (
          <Tabla columns={columns} table={pagos} />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No hay registros para mostrar.</span>}
          />
        )}
      </div>
      {openModalIndivudual && (
        <ModalPagosIndividual
          open={openModalIndivudual}
          closeModal={handleCloseModalIndivudual}
          actualizarTabla={getPagos}
        />
      )}
    </>
  );
};

export default PagosLayout;

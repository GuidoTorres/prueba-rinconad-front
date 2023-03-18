import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineForm } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { valuesContrato } from "../../../data/initalValues";
import { addDays } from "../../../helpers/calcularFechaFin";
import { notificacion } from "../../../helpers/mensajes";
import MainModal from "../../modal/MainModal";
import { Button, Input, Select, Form } from "antd";
import "../styles/modalRegistrarContrato.css";
import { modalRegistroContratoAsociacion } from "../../../data/FormValues";

const ModalContratoAsociacion = ({
  actualizarTabla,
  selected,
  data,
  evaluaciones,
  actualizarAsociacion,
  modal2,
  setModal2,
  dataContrato,
}) => {
  const [form] = Form.useForm();

  const route = "contrato/asociacion";
  const route1 = "cargo";
  const route2 = "campamento";
  const route3 = "gerencia";
  const route4 = "area";
  const route5 = "socio";

  const ids = data?.trabajador
    ?.map((item) => item?.evaluacions?.id)
    .filter((item) => item !== undefined);

    console.log('====================================');
    console.log(ids);
    console.log('====================================');

  //valores iniciales de contrato
  const contratoValues = valuesContrato(data, ids);

  const {
    createData,
    updateData,
    getData,
    setDataToEdit,
    dataToEdit,
    cargando,
    setCargando,
  } = useContext(CrudContext);
  const [contratos, setContratos] = useState(contratoValues);
  const [cargo, setCargo] = useState([]);
  const [campamento, setCampamento] = useState([]);
  const [gerencia, setGerencia] = useState([]);
  const [area, setArea] = useState([]);
  const [socio, setSocio] = useState([]);
  const [id, setId] = useState([]);

  const getAll = async () => {
    const cargoData = getData(route1);
    const campamentoData = getData(route2);
    const gerenciaData = getData(route3);
    const areaData = getData(route4);
    const socioData = getData(route5);
    const response7 = getData("contrato/last/id");

    const all = await Promise.all([
      cargoData,
      campamentoData,
      gerenciaData,
      areaData,
      socioData,
      response7,
    ]);
    setCargo(all[0].data);
    setCampamento(all[1].data);
    setGerencia(all[2].data);
    setArea(all[3].data);
    setSocio(all[4].data);
    setId(all[5].data);
  };
  useEffect(() => {
    getAll();
  }, []);

  const handleData = (e, text) => {
    if (!text && e.target) {
      const { name, value } = e.target;
      form.setFieldsValue({
        [name]: value,
      });
      setContratos((values) => {
        return { ...values, [name]: value };
      });
    } else {
      form.setFieldsValue({
        [text]: e,
      });
      setContratos((values) => {
        return { ...values, [text]: e };
      });
    }
  };

  const handleSubmit = async (e) => {
    if (dataToEdit === null) {
      setCargando(true);
      const response = await createData(contratos, route);
      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarAsociacion();
        actualizarTabla();
        setCargando(false);
      }
    }

    if (dataToEdit) {
      setCargando(true);
      const response = await updateData(contratos, dataToEdit.id, "contrato");

      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarAsociacion();
        actualizarTabla();
        setCargando(false);
      }
    }
  };

  const closeModal = () => {
    setModal2(false);
    setDataToEdit(null);
    setContratos(contratoValues);
    setCargando(false);
  };

  useEffect(() => {
    if (dataToEdit) {
      setContratos(dataToEdit);
    } else {
      setContratos(contratoValues);
    }
  }, [dataToEdit]);

  useEffect(() => {
    if (dataToEdit === null) {
      setContratos((value) => ({ ...value, codigo_contrato: id }));
    }
  }, [id]);

  useEffect(() => {
    //para calcular la fecha de fin al registrar contrato
    if (contratos.fecha_inicio !== "" && contratos.periodo_trabajo !== "") {
      let inicial = 14;
      let fechaInicio = contratos.fecha_inicio;
      let total = inicial * parseInt(contratos.periodo_trabajo);
      const date = addDays(fechaInicio, total, "asociacion");
      setContratos((prevState) => {
        return { ...prevState, fecha_fin: date };
      });
    } else {
      setContratos((prevState) => {
        return { ...prevState, fecha_fin: "" };
      });
    }
  }, [contratos.fecha_inicio, contratos.periodo_trabajo]);

  const formData = modalRegistroContratoAsociacion(
    contratos,
    handleData,
    cargo,
    campamento,
    gerencia,
    area,
    id,
    dataToEdit
  );

  return (
    <MainModal
      className={"modal-contrato-empresa"}
      title={dataToEdit ? "Editar contrato" : "Registrar contrato"}
      open={modal2}
      width={900}
      closeModal={closeModal}
    >
      <Form
        form={form}
        className="modal-body"
        onFinish={handleSubmit}
        layout="horizontal"
      >
        {/* <label htmlFor="">Contrato</label> */}
        <div className="contrato">
          {formData.splice(0, 12).map((item, i) => (
            <Form.Item
              className="item"
              key={i}
              name={item.name}
              rules={item.rules}
              style={{ marginBottom: "8px" }}
            >
              <>
                {item.label}
                {item.type}
              </>
            </Form.Item>
          ))}
        </div>
        <div className="finalizacion">
          {formData.map((item, i) => (
            <Form.Item
              key={i}
              name={item.name}
              rules={item.rules}
              style={{ marginBottom: "8px" }}
            >
              <>
                {item.label}
                {item.type}
              </>
            </Form.Item>
          ))}
        </div>
        <Form.Item className="button-container">
          <Button
            htmlType="submit"
            icon={<AiOutlineForm />}
            loading={cargando ? true : false}
          >
            {dataToEdit ? " Editar" : " Registrar"}
          </Button>
        </Form.Item>
      </Form>
    </MainModal>
  );
};

export default ModalContratoAsociacion;

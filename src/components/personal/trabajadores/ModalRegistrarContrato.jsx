import React, { useContext, useEffect, useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import MainModal from "../../modal/MainModal";
import { notificacion } from "../../../helpers/mensajes";
import { Button, Form } from "antd";
import { AiOutlineForm } from "react-icons/ai";
import { modalRegistroContratoPersonal } from "../../../data/FormValues";
import { addDays } from "../../../helpers/calcularFechaFin";
import "../styles/modalRegistrarContrato.css";

const ModalRegistrarContrato = ({
  actualizarTrabajadores,
  actualizarTabla,
  selected,
  trabajadorDni,
}) => {
  const [form] = Form.useForm();
  const route = "contrato";
  const route1 = "cargo";
  const route2 = "campamento";
  const route3 = "gerencia";
  const route4 = "area";
  const route5 = "socio";

  const {
    createData,
    updateData,
    getData,
    setDataToEdit,
    dataToEdit,
    modal3,
    setModal3,
    cargando,
    setCargando,
  } = useContext(CrudContext);

  const [cargo, setCargo] = useState([]);
  const [campamento, setCampamento] = useState([]);
  const [gerencia, setGerencia] = useState([]);
  const [area, setArea] = useState([]);
  const [responseContrato, setResponseContrato] = useState([]);
  const [socio, setSocio] = useState([]);
  const [id, setId] = useState("");
  const getAll = async () => {
    const response1 = getData(route1);
    const response2 = getData(route2);
    const response3 = getData(route3);
    const response4 = getData(route4);
    const response5 = getData(route5);
    const response7 = getData("contrato/last/id");

    const all = await Promise.all([
      response1,
      response2,
      response3,
      response4,
      response5,
      response7,
    ]);

    setCargo(all[0].data);
    setCampamento(all[1].data);
    setGerencia(all[2].data);
    setArea(all[3].data);
    setSocio(all[4].data);
    setId(all[5].data);
  };
  const trabajadorContratoValues = {
    fecha_inicio: "",
    codigo_contrato: "",
    tipo_contrato: "",
    recomendado_por: "",
    cooperativa: "",
    condicion_cooperativa: "",
    periodo_trabajo: "",
    fecha_fin: "",
    gerencia: "",
    area: "",
    jefe_directo: "",
    base: "",
    termino_contrato: "",
    campamento_id: "",
    nota_contrato: "",
    puesto: "",
    estado: false,
    volquete: "",
    teletran: "",
    suspendido: false,
    finalizado: false,
    tareo: "",
    trabajador_id: trabajadorDni,
  };
  const [contrato, setContrato] = useState(trabajadorContratoValues);
  useEffect(() => {
    if (dataToEdit === null) {
      setContrato((value) => ({ ...value, codigo_contrato: id }));
    }
  }, [id, dataToEdit]);
  useEffect(() => {
    if (dataToEdit) {
      setContrato(dataToEdit);
      form.setFieldsValue(dataToEdit);
    } else {
      setContrato(trabajadorContratoValues);
    }
  }, [dataToEdit]);

  useEffect(() => {
    getAll();
  }, []);
  useEffect(() => {
    //para calcular la fecha de fin al registrar contrato
    if (contrato.fecha_inicio !== "" && contrato.periodo_trabajo !== "") {
      let inicial = 14;
      let fechaInicio = contrato.fecha_inicio;
      let total = inicial * parseInt(contrato.periodo_trabajo);
      const date = addDays(fechaInicio, total, contrato.tareo);
      setContrato((prevState) => {
        return { ...prevState, fecha_fin: date };
      });
    } else {
      setContrato((prevState) => {
        return { ...prevState, fecha_fin: "" };
      });
    }
  }, [contrato.fecha_inicio, contrato.periodo_trabajo, contrato.tareo]);

  const handleData = (e, text) => {
    if (!text && e.target) {
      const { name, value } = e.target;
      form.setFieldsValue({
        [name]: value,
      });
      setContrato((values) => {
        return { ...values, [name]: value };
      });
    } else {
      form.setFieldsValue({
        [text]: e,
      });
      setContrato((values) => {
        return { ...values, [text]: e };
      });
    }
  };

  const handleSubmit = async () => {
    if (dataToEdit === null) {
      setCargando(true);
      const response = await createData(contrato, route);
      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarTabla();
        actualizarTrabajadores();
        setCargando(false);
      }
    }
    if (dataToEdit) {
      setCargando(true);
      const response = await updateData(contrato, selected.id, route);
      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarTabla();
        setCargando(false);
      }
    }
  };

  const closeModal = () => {
    setModal3(false);
    setDataToEdit(null);
    setContrato(trabajadorContratoValues);
  };

  const formData = modalRegistroContratoPersonal(
    contrato,
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
      open={modal3}
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
          {formData.splice(0, 13).map((item, i) => (
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

export default ModalRegistrarContrato;

import { Form, Button } from "antd";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { modalContratoEmpresa } from "../../../data/FormValues";
import { valuesContratoEmpresa } from "../../../data/initalValues";
import { notificacion } from "../../../helpers/mensajes";
import MainModal from "../../modal/MainModal";
import { AiOutlineForm } from "react-icons/ai";
import "../styles/modalRegistrarContrato.css";
import { logDOM } from "@testing-library/react";
import dayjs from "dayjs";
const ModalRegistrarContrato = ({
  actualizarTabla,
  selected,
  data,
  modal2,
  setModal2,
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
    cargando,
    setCargando,
  } = useContext(CrudContext);

  const empresaValues = valuesContratoEmpresa(data.id);

  const [contrato, setContrato] = useState(empresaValues);
  const [cargo, setCargo] = useState([]);
  const [campamento, setCampamento] = useState([]);
  const [gerencia, setGerencia] = useState([]);
  const [area, setArea] = useState([]);
  const [socio, setSocio] = useState([]);
  const [id, setId] = useState("");

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
    if (dataToEdit) {
      const formatData = dataToEdit
        .map((item) => {
          return {
            codigo_contrato: item.codigo_contrato,
            fecha_inicio: dayjs(item.fecha_inicio).format("YYYY-MM-DD"),
            fecha_fin: dayjs(item.fecha_fin).format("YYYY-MM-DD"),
            periodo_trabajo: item.periodo_trabajo,
            tipo_contrato: item.tipo_contrato,
            gerencia: item.gerencia,
            campamento_id: item.campamento_id,
            volquete: item.volquete,
            teletran: item.teletran,
            suspendido: item.suspendido,
            termino_contrato: item.termino_contrato,
            nota_contrato: item.nota_contrato,
          };
        })
        ?.at(-1);
      setContrato(formatData);
      form.setFieldsValue(formatData)
    } else {
      setContrato(empresaValues);
    }
  }, [dataToEdit]);

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (dataToEdit === null) {
      setContrato((value) => ({ ...value, codigo_contrato: id }));
    }
  }, [id, dataToEdit]);

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

  const handleSubmit = async (e) => {
    if (dataToEdit === null) {
      setCargando(true);
      const response = await createData(contrato, route);
      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarTabla();
        setCargando(false);
      }
    } else {
      setCargando(true);
      const response = await updateData(contrato, dataToEdit?.at(-1)?.id, route);
      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarTabla();
        setCargando(false);
      }
    }
  };

  const closeModal = () => {
    setModal2(false);
    setDataToEdit(null);
    setContrato(modalContratoEmpresa);
  };

  const formData = modalContratoEmpresa(
    contrato,
    handleData,
    gerencia,
    cargo,
    campamento,
    socio
  );
  return (
    <MainModal
      className={"modal-contrato-empresa"}
      title={"Registrar contrato"}
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
        <div className="contrato">
          {formData.slice(0, 9).map((item, i) => (
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
          {formData.slice(9, 15).map((item, i) => (
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

        <Form.Item className="button-container">
          <Button
            htmlType="submit"
            loading={cargando ? true : false}
            icon={<AiOutlineForm />}
          >
            {dataToEdit ? "Editar" : "Registrar"}
          </Button>
        </Form.Item>
      </Form>
    </MainModal>
  );
};

export default ModalRegistrarContrato;

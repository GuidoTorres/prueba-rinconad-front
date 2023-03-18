import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { modalRegistrarSocio } from "../../../data/FormValues";
import { notificacion } from "../../../helpers/mensajes";
import MainModal from "../../modal/MainModal";
import { Button, Form } from "antd";

import "../styles/modalRegistroSocio.css";
import { AiOutlineForm } from "react-icons/ai";

const ModalRegistroSocio = ({ actualizarTabla }) => {
  const [form] = Form.useForm();



  const route = "socio";
  const socioValues = {
    nombre: "",
    dni: "",
    telefono: "",
    cooperativa: "",
  };

  const [socio, setSocio] = useState(socioValues);
  const {
    createData,
    updateData,
    modal,
    setModal,
    setDataToEdit,
    dataToEdit,
    cargando,
    setCargando,
  } = useContext(CrudContext);

  const closeModal = () => {
    setModal(false);
    setDataToEdit(null);
    setSocio(socioValues);
    setCargando(false);
  };

  const handleData = (e, text) => {
    if (!text && e.target) {
      const { name, value } = e.target;
      form.setFieldsValue({
        [name]: value,
      });
      setSocio((values) => {
        return { ...values, [name]: value };
      });
    } else {
      form.setFieldsValue({
        [text]: e,
      });
      setSocio((values) => {
        return { ...values, [text]: e };
      });
    }
  };

  const handleSubmit = async (e) => {
    if (dataToEdit === null) {
      setCargando(true);
      const response = await createData(socio, route);
      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarTabla();
        setCargando(false);
      }
    }
    if (dataToEdit) {
      setCargando(true);
      const response = await updateData(socio, dataToEdit.id, route);
      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarTabla();
        setCargando(false);
      }
    }
  };

  useEffect(() => {
    if (dataToEdit) {
      setSocio(dataToEdit);
      form.setFieldsValue(dataToEdit);
    } else {
      setSocio(socioValues);
    }
  }, [dataToEdit]);

  const formData = modalRegistrarSocio(socio, handleData);

  return (
    <MainModal
      className={"modal-socio"}
      title={dataToEdit ? "Editar socio" : "Registrar socio"}
      open={modal}
      width={400}
      closeModal={closeModal}
    >
      <Form
        form={form}
        className="modal-body"
        onFinish={handleSubmit}
        layout="horizontal"
      >
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

export default ModalRegistroSocio;

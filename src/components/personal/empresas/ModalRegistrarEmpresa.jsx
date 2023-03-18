import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { Button, Form } from "antd";
import { notificacion } from "../../../helpers/mensajes";
import MainModal from "../../modal/MainModal";
import { modalRegistroEmpresa } from "../../../data/FormValues";
import "../styles/modalRegistrarEmpresa.css";
import { AiOutlineForm } from "react-icons/ai";

const ModalRegistrarEmpresa = ({
  actualizarTabla,
  selected,
  modal,
  setModal,
}) => {
  const [form] = Form.useForm();

  const route = "empresa";
  const empresaValues = {
    razon_social: "",
    ruc: "",
  };
  const [empresa, setEmpresa] = useState(empresaValues);
  const {
    createData,
    updateData,
    setDataToEdit,
    dataToEdit,

    cargando,
    setCargando,
  } = useContext(CrudContext);

  useEffect(() => {
    if (dataToEdit) {
      setEmpresa(dataToEdit);
      form.setFieldsValue(dataToEdit);
    } else {
      setEmpresa(empresaValues);
    }
  }, [dataToEdit]);

  const closeModal = () => {
    setModal(false);
    setDataToEdit(null);
    setEmpresa(empresaValues);
  };

  const handleSubmit = async (e) => {
    if (dataToEdit === null) {
      setCargando(true);
      const response = await createData(empresa, route);

      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarTabla();
        setCargando(false);
      }
    }

    if (dataToEdit) {
      setCargando(true);
      const response = await updateData(empresa, dataToEdit.id, route);
      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarTabla();
        setCargando(false);
      }
    }
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    form.setFieldsValue({
      [name]: value,
    });
    setEmpresa((values) => {
      return { ...values, [name]: value };
    });
  };

  const formData = modalRegistroEmpresa(empresa, handleData);

  return (
    <MainModal
      className={"modal-empresa"}
      title={dataToEdit ? "Editar empresa" : "Registrar empresa"}
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

export default ModalRegistrarEmpresa;

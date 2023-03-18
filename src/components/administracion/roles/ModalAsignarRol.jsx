import { Button, Form } from "antd";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { modalAsignarRol } from "../../../data/FormValues";
import { rolValues } from "../../../data/initalValues";
import { notificacion } from "../../../helpers/mensajes";
import MainModal from "../../modal/MainModal";
import { AiOutlineForm } from "react-icons/ai";
import "../styles/modalAsignarUsuario.css";

const ModalAsignarRol = ({ actualizarTabla }) => {
  const [form] = Form.useForm();

  const { createData, updateData, setModal, dataToEdit, setDataToEdit, modal, cargando, setCargando } =
    useContext(CrudContext);

  const [rol, setRol] = useState(rolValues);

  useEffect(() => {
    if (dataToEdit) {
      setRol(dataToEdit);
      form.setFieldsValue(dataToEdit);
    } else {
      setRol(rolValues);
    }
  }, [dataToEdit]);


  const handleData = (e) => {
    const { name, value } = e.target;
    form.setFieldsValue({
      [name]: value,
    });
    setRol((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    const route = "rol";
    if (dataToEdit === null) {
      setCargando(true)
      const response = await createData(rol, "rol");
      if (response) {
        notificacion(response.status, response.msg);
        actualizarTabla();
        closeModal();
        setCargando(false)
      }
    }

    if (dataToEdit) {
      setCargando(true)

      const response = await updateData(rol, dataToEdit.id, route);
      if (response) {
        notificacion(response.status, response.msg);
        actualizarTabla();
        closeModal();
        setCargando(false)
      }
    }
  };

  const closeModal = () => {
    setModal(false);
    setDataToEdit(null);
    setRol(rolValues);
    setCargando(false)
  };

  const formData = modalAsignarRol(rol, handleData);

  return (
    <MainModal
      className={"modal-rol"}
      title={dataToEdit ? "Editar rol" : "Registrar rol"}
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
        {formData.map((item) => (
          <Form.Item
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
          <Button htmlType="submit" icon={<AiOutlineForm />} loading={cargando? true: false}>
            {dataToEdit ? "Editar" : "Registrar"}
          </Button>
        </Form.Item>
      </Form>
    </MainModal>
  );
};

export default ModalAsignarRol;

import { Button, Form, Input } from "antd";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { AiOutlineForm } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { notificacion } from "../../../helpers/mensajes";
import MainModal from "../../modal/MainModal";

import "./modalRegistrarCategoria.css";

const ModalRegistrarCategoria = ({ actualizarTabla }) => {
  const [form] = Form.useForm();

  const initialValues = {
    abreviatura: "",
    descripcion: "",
  };

  const { setModal, dataToEdit, createData, updateData, setDataToEdit, modal, cargando, setCargando } =
    useContext(CrudContext);
  const [categoria, setCategoria] = useState(initialValues);

  const closeModal = () => {
    setModal(false);
    setDataToEdit(null);
  };

  useEffect(() => {
    if (dataToEdit !== null) {
      setCategoria(dataToEdit);
      form.setFieldsValue(dataToEdit);
    } else {
      setCategoria(initialValues);
    }
  }, []);

  const handleData = (e) => {
    const { name, value } = e.target;
    form.setFieldsValue({
      [name]: value,
    });
    setCategoria((values) => {
      return { ...values, [name]: value };
    });
  };


  const handleSubmit = async (e) => {
    const route = "categoria";
    if (dataToEdit !== null) {
      setCargando(true)
      const response = await updateData(categoria, dataToEdit.id, route);
      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarTabla();
        setCargando(false)
      }
    } else {
      setCargando(true)
      const response = await createData(categoria, route);
      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarTabla();
        setCargando(false)
      }
    }
  };


  return (
    <MainModal
      className={"modal-categoria"}
      title={dataToEdit ? "Editar categoría" : "Registrar categoría"}
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
        <Form.Item style={{ marginBottom: "8px" }} name="abreviatura">
          <label htmlFor="">Abreviatura</label>
          <Input
            name="abreviatura"
            onChange={handleData}
            placeholder="Abreviatura"
            value={categoria.abreviatura}
          />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "8px" }}
          name="descripcion"
          rules={[{ required: true, message: "Campo obligatorio!" }]}
        >
          <label htmlFor="">Descripción</label>
          <Input
            name="descripcion"
            onChange={handleData}
            placeholder="Descripción"
            value={categoria.descripcion}
          />
        </Form.Item>

        <Form.Item className="button-container">
          <Button htmlType="submit" icon={<AiOutlineForm/>} loading={cargando ? true: false}>
            {dataToEdit ? "Editar" : "Registrar"}
          </Button>
        </Form.Item>
      </Form>
    </MainModal>
  );
};

export default ModalRegistrarCategoria;

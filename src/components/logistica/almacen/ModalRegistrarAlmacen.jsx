import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { almacenValues } from "../../../data/initalValues";
import { Button, Form } from "antd";
import { modalAlmacen } from "../../../data/FormValues";
import MainModal from "../../modal/MainModal";
import { notificacion } from "../../../helpers/mensajes";
import "../styles/modalRegistrarAlmacen.css";
import { AiOutlineForm } from "react-icons/ai";

const ModalRegistrarAlmacen = ({ actualizarTabla }) => {
  const [form] = Form.useForm();
  const [almacen, setAlmacen] = useState(almacenValues);
  const { dataToEdit, createData, updateData, setModal, setDataToEdit, modal, cargando, setCargando } =
    useContext(CrudContext);

  useEffect(() => {
    if (dataToEdit !== null) {
      setAlmacen(dataToEdit);
      form.setFieldsValue(dataToEdit);

    } else {
      setAlmacen(almacenValues);
    }
  }, [dataToEdit]);

  const closeModal = () => {
    setModal(false);
    setDataToEdit(null);
    setAlmacen(almacenValues);
    form.resetFields();
  };

  const handleSubmit = async (e) => {
    let route = "almacen";
    if (dataToEdit === null) {
      setCargando(true)
      const response = await createData(almacen, route);
      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarTabla();
        setCargando(false)
      }
    } else {
      setCargando(true)
      const response = await updateData(almacen, dataToEdit.id, route);
      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarTabla();
        setCargando(false)
      }
    }
  };

  const handleData = (e) => {
    const { name, value } = e.target;

    form.setFieldsValue({
      [name]: value,
    });
    setAlmacen((values) => {
      return { ...values, [name]: value };
    });
  };

  const formData = modalAlmacen(almacen, handleData);

  return (
    <>
      <MainModal
        className={"modal-almacen"}
        title={dataToEdit ? "Editar almacén" : "Registrar almacén"}
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
            <Button htmlType="submit" icon={<AiOutlineForm />} loading={cargando ? true: false}>
              {dataToEdit ? "Editar" : "Registrar"}
            </Button>
          </Form.Item>
        </Form>
      </MainModal>
    </>
  );
};

export default ModalRegistrarAlmacen;

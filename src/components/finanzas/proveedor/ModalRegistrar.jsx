import { Button, Form } from "antd";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { modalRegistrarProveedor } from "../../../data/FormValues";
import { proveedorValues } from "../../../data/initalValues";
import { notificacion } from "../../../helpers/mensajes";
import MainModal from "../../modal/MainModal";
import { AiOutlineForm } from "react-icons/ai";

import "../styles/modalProveedor.css";

const ModalRegistrarProveedor = ({ actualizarTabla }) => {
  const [form] = Form.useForm();

  const {
    createData,
    dataToEdit,
    setDataToEdit,
    updateData,
    modal,
    setModal,
    cargando,
    setCargando,
  } = useContext(CrudContext);
  const [proveedor, setProveedor] = useState(proveedorValues);

  useEffect(() => {
    if (dataToEdit !== null) {
      setProveedor(dataToEdit);
      form.setFieldsValue(dataToEdit);
    } else {
      setProveedor(proveedorValues);
    }
  }, [dataToEdit]);

  const closeModal = () => {
    setModal(false);
    setDataToEdit(null);
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    form.setFieldsValue({
      [name]: value,
    });
    setProveedor((values) => {
      return { ...values, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    let route = "proveedor";
    if (dataToEdit === null) {
      setCargando(true);
      const response = await createData(proveedor, route);
      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarTabla();
        setCargando(false);
      }
    } else {
      setCargando(true);
      const response = await updateData(proveedor, dataToEdit.id, route);
      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarTabla();
        setCargando(false);
      }
    }
  };
  const formData = modalRegistrarProveedor(proveedor, handleData);
  return (
    <MainModal
      className={"modal-proveedor"}
      title={dataToEdit ? "Editar proveedor" : "Registrar proveedor"}
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

export default ModalRegistrarProveedor;

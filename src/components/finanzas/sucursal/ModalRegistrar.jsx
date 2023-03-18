import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { modalRegistrarSucursal } from "../../../data/FormValues";
import { sucursalValues } from "../../../data/initalValues";
import { notificacion } from "../../../helpers/mensajes";
import MainModal from "../../modal/MainModal";
import { AiOutlineForm } from "react-icons/ai";


const ModalRegistrar = ({ actualizarTabla }) => {
  const [form] = Form.useForm();

  const {
    setDataToEdit,
    dataToEdit,
    createData,
    updateData,
    modal,
    setModal,
    cargando,
    setCargando,
  } = useContext(CrudContext);

  const [sucursal, setSucursal] = useState(sucursalValues);

  useEffect(() => {
    if (dataToEdit !== null) {
      setSucursal(dataToEdit);
      form.setFieldsValue(dataToEdit);
    } else {
      setSucursal(sucursalValues);
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
    setSucursal((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    let route = "sucursal";

    if (dataToEdit === null) {
      setCargando(true);
      const response = await createData(sucursal, route);
      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarTabla();
        setCargando(false);
      }
    } else {
      const response = await updateData(sucursal, dataToEdit.id, route);
      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarTabla();
      }
    }
  };

  const formData = modalRegistrarSucursal(sucursal, handleData, dataToEdit);
  return (
    <MainModal
      className={"modal-proveedor"}
      title={dataToEdit ? "Editar sucursal" : "Registrar sucursal"}
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
            {dataToEdit ? "Editar" : "Registrar"}
          </Button>
        </Form.Item>
      </Form>
    </MainModal>
  );
};

export default ModalRegistrar;

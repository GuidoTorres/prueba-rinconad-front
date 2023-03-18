import { Button, Form, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineForm } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { notificacion } from "../../../helpers/mensajes";
import MainModal from "../../modal/MainModal";
import "../styles/modalVolquete.css";

const ModalVolquete = ({ actualizarTabla }) => {
  const [form] = Form.useForm();

  const {
    dataToEdit,
    modal,
    cargando,
    setModal,
    setCargando,
    createData,
    updateData,
    setDataToEdit,
  } = useContext(CrudContext);
  const [volquete, setVolquete] = useState({ placa: "", propietario: "" });

  const closeModal = () => {
    setModal(false);
    setCargando(false);
    setDataToEdit(null);
  };

  const handleSubmit = async () => {
    if (dataToEdit === null) {
      setCargando(true);
      const response = await createData(volquete, "volquete");
      if (response) {
        notificacion(response.status, response.msg);
        actualizarTabla();
        closeModal();
        setCargando(false);
      }
    }
    if (dataToEdit) {
      setCargando(true);
      const response = await updateData(volquete, dataToEdit.id, "volquete");
      if (response) {
        notificacion(response.status, response.msg);
        actualizarTabla();
        closeModal();
        setCargando(false);
      }
    }
  };
  useEffect(() => {
    if (dataToEdit) {
      setVolquete(dataToEdit);
      form.setFieldsValue(dataToEdit);
    } else {
      setVolquete({ placa: "", propietario: "" });
    }
  }, [dataToEdit]);


  console.log('====================================');
  console.log(volquete);
  console.log('====================================');

  return (
    <MainModal
      className={"modal-volquete"}
      title={dataToEdit ? "Editar volquete" : "Registrar volquete"}
      open={modal}
      width={400}
      closeModal={closeModal}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="placa"
          rules={[{ required: true, message: "Campo obligatorio!" }]}
          style={{ marginBottom: "8px" }}
        >
          <Input
            value={volquete?.placa}
            type="text"
            name="placa"
            placeholder="Placa"
            onChange={(e) => setVolquete(value => ({...value, placa: e.target.value }))}
          ></Input>
        </Form.Item>

        <Form.Item
          name="propietario"
          rules={[{ required: false }]}
        >
          <Input
            value={volquete?.propietario}
            type="text"
            name="propietario"
            placeholder="Propietario"
            onChange={(e) => setVolquete(value => ({...value, propietario: e.target.value }))}
          ></Input>

          <div className="button-container">
            <Button
              htmlType="submit"
              icon={<AiOutlineForm />}
              loading={cargando ? true : false}
            >
              {dataToEdit ? "Editar" : "Registrar"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </MainModal>
  );
};

export default ModalVolquete;

import { Button, Form, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineForm } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { notificacion } from "../../../helpers/mensajes";
import MainModal from "../../modal/MainModal";
import "../styles/modalVolquete.css";

const ModalTrapiche = ({ actualizarTabla }) => {
  const [form] = Form.useForm();
  const {
    dataToEdit,
    modal,
    createData,
    updateData,
    setModal,
    cargando,
    setCargando,
  } = useContext(CrudContext);
  const [trapiche, setTrapiche] = useState({ nombre: "" });

  const closeModal = () => {
    setModal(false);
    setCargando(false)
  };

  useEffect(() => {
    if (dataToEdit) {
      setTrapiche(dataToEdit);
      form.setFieldsValue(dataToEdit);
    } else {
      setTrapiche({ nombre: "" });
    }
  }, [dataToEdit]);

  const handleSubmit = async () => {
    if (dataToEdit === null) {
      setCargando(true);
      const response = await createData(trapiche, "trapiche");
      if (response) {
        notificacion(response.status, response.msg);
        actualizarTabla();
        closeModal();
        setCargando(false)

      }
    }
    if (dataToEdit) {
      setCargando(true);
      const response = await updateData(trapiche, dataToEdit.id, "trapiche");
      if (response) {
        notificacion(response.status, response.msg);
        actualizarTabla();
        closeModal();
        setCargando(false)
      }
    }
  };


  return (
    <MainModal
      className={"modal-volquete"}
      title={dataToEdit ? "Editar trapiche" : "Registrar trapiche"}
      open={modal}
      width={400}
      closeModal={closeModal}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
        
          name="nombre"
          rules={[{ required: true, message: "Campo obligatorio!" }]}
        >
          <Input
            value={trapiche?.nombre}
            type="text"
            name="nombre"
            placeholder="Nombre"
            onChange={(e) => setTrapiche({ nombre: e.target.value })}
          ></Input>
        </Form.Item>

        <div className="button-container">
          <Button
            htmlType="submit"
            icon={<AiOutlineForm />}
            loading={cargando ? true : false}
          >
            {dataToEdit ? "Editar" : "Registrar"}
          </Button>
        </div>
      </Form>
    </MainModal>
  );
};

export default ModalTrapiche;

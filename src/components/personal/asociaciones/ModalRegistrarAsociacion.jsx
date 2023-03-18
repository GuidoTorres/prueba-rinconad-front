import { Form, Button } from "antd";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AiOutlineForm } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { modalRegistroAsociacion } from "../../../data/FormValues";
import { notificacion } from "../../../helpers/mensajes";
import MainModal from "../../modal/MainModal";
import "../styles/modalAsociacion.css";

const ModalRegistrarAsociacion = ({
  actualizarTabla,
  selected,
  modal,
  setModal,
}) => {
  const [form] = Form.useForm();

  const route = "asociacion";
  const asociacionValues = {
    nombre: "",
    codigo: "",
    tipo: "",
  };

  const [asociacion, setAsociacion] = useState(asociacionValues);
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
      setAsociacion(dataToEdit);
      form.setFieldsValue(dataToEdit);
    } else {
      setAsociacion(asociacionValues);
    }
  }, [dataToEdit]);

  const closeModal = () => {
    setModal(false);
    setDataToEdit(null);
    setAsociacion(asociacionValues);
    setCargando(false)
  };

  const handleSubmit = async (e) => {
    if (dataToEdit === null) {
      setCargando(true);
      const response = await createData(asociacion, route);
      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarTabla();
        setCargando(false);
      }
    }
    if (dataToEdit) {
      setCargando(true);
      const response = await updateData(asociacion, dataToEdit.id, route);
      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarTabla();
        setCargando(false);
      }
    }
  };

  const handleData = (e, text) => {
    if (!text && e.target) {
      const { name, value } = e.target;
      form.setFieldsValue({
        [name]: value,
      });
      setAsociacion((values) => {
        return { ...values, [name]: value };
      });
    } else {
      form.setFieldsValue({
        [text]: e,
      });
      setAsociacion((values) => {
        return { ...values, [text]: e };
      });
    }
  };

  const formData = modalRegistroAsociacion(asociacion, handleData);

  return (
    <MainModal
      className="modal-registrar-asociacion"
      title={dataToEdit ? "Editar asociación" : "Registrar asociación"}
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
        {formData.splice(0, 1).map((item, i) => (
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
        {asociacion.tipo === "Canteadores" ?
          formData.splice(0, 2).map((item, i) => (
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
          ))
          : formData.splice(0, 1).map((item, i) => (
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
          ))
        }

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

export default ModalRegistrarAsociacion;

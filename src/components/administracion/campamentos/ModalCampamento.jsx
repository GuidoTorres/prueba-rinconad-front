import React, { useContext, useEffect, useState } from "react";
import { campamentoValues } from "../../../data/initalValues";
import { CrudContext } from "../../../context/CrudContext";
import { Button, Form } from "antd";
import { modalCampamento } from "../../../data/FormValues";
import MainModal from "../../modal/MainModal";
import { notificacion } from "../../../helpers/mensajes";
import { AiOutlineForm } from "react-icons/ai";
import "../styles/modalCampamento.css";

const ModalCampamento = ({ actualizarTabla }) => {
  const [form] = Form.useForm();
  const route = "campamento";
  const {
    createData,
    updateData,
    modal,
    setModal,
    dataToEdit,
    setDataToEdit,
    cargando,
    setCargando,
  } = useContext(CrudContext);
  const [campamento, setCampamento] = useState(campamentoValues);

  useEffect(() => {
    if (dataToEdit) {
      setCampamento(dataToEdit);
      form.setFieldsValue(dataToEdit);
    } else {
      setCampamento(campamentoValues);
    }
  }, [dataToEdit]);

  const handleData = (e) => {
    const { name, value } = e.target;

    form.setFieldsValue({
      [name]: value,
    });
    setCampamento((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    if (dataToEdit === null) {
      setCargando(true);
      const response = await createData(campamento, route);
      if (response) {
        notificacion(response.status, response.msg);
        actualizarTabla();
        closeModal();
        setCargando(false);
      }
    }

    if (dataToEdit) {
      setCargando(true);
      const response = await updateData(campamento, dataToEdit.id, route);
      if (response) {
        notificacion(response.status, response.msg);
        actualizarTabla();
        closeModal();
        setCargando(false);
      }
    }
  };

  const closeModal = () => {
    setModal(false);
    setDataToEdit(null);
    setCampamento(campamentoValues);
  };

  const formData = modalCampamento(campamento, handleData);

  return (
    <MainModal
      className={"modal-campamento"}
      title={dataToEdit ? "Editar campamento" : "Registrar campamento"}
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

export default ModalCampamento;

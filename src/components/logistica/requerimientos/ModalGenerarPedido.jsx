import React from "react";
import { useState , useEffect, useContext} from "react";
import { CrudContext } from "../../../context/CrudContext";
import { generarPedido } from "../../../data/FormValues";
import MainModal from "../../modal/MainModal";
import { AiOutlineForm } from "react-icons/ai";
import { Button, Form } from "antd";
import { notificacion } from "../../../helpers/mensajes";
import "../styles/modalGenerarPedido.css";

const ModalGenerarPedido = ({ actualizarTabla }) => {
  const [form] = Form.useForm();

  const [reqIds, setReqIds] = useState([])

  const {
    setModal,
    dataToEdit,
    setDataToEdit,
    multipleRequerimientos,
    createData,
    getData,
    modal,
    cargando,
    setCargando,
    setMultipleRequerimientos
  } = useContext(CrudContext);

  const initialValues = {
    solicitante: "",
    area: "",
    proyecto: "",
    celular: "",
    fecha: "",
  };

  const [pedido, setPedido] = useState(initialValues);
  const [area, setArea] = useState([]);

  const getArea = async () => {
    const route = "area";

    const response = await getData(route);
    setArea(response.data);
  };

  useEffect(() => {
    getArea();
  }, []);

  const closeModal = () => {
    setModal(false);
    setDataToEdit(null);
  };



  const handleSubmit = async (e) => {
    const route = "pedido";

    let info = {
      fecha: pedido.fecha,
      estado: "Completado",
      req_id: multipleRequerimientos.map(item => item.id),
      solicitante: pedido.solicitante,
      area: pedido.area,
      proyecto: pedido.proyecto,
      celular: pedido.celular,
    };
    setCargando(true);
    const response = await createData(info, route);
    if (response) {
      notificacion(response.status, response.msg);
      actualizarTabla();
      closeModal();
      setCargando(false);
      setMultipleRequerimientos([])
    }

  };

  const handleData = (e, text) => {
    if (!text && e.target) {
      const { name, value } = e.target;
      form.setFieldsValue({
        [name]: value,
      });
      setPedido((values) => {
        return { ...values, [name]: value };
      });
    } else {
      form.setFieldsValue({
        [text]: e,
      });
      setPedido((values) => {
        return { ...values, [text]: e };
      });
    }
  };

  const formData = generarPedido(pedido, handleData, area);

  return (
    <MainModal
      className={"modal-pedido"}
      title={"Generar pedido"}
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
             {item.label}
            {item.type}
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

export default ModalGenerarPedido;

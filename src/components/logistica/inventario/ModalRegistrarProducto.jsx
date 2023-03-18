import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { productoValues } from "../../../data/initalValues";
import DragAndDrop from "../../personal/DragAndDrop";
import { Modal, Button, Form } from "antd";
import { modalRegistroProducto } from "../../../data/FormValues";
import { AiOutlineForm } from "react-icons/ai";
import { notificacion } from "../../../helpers/mensajes";
import "../styles/modalProducto.css";

const ModalRegistrarProducto = ({ actualizarTabla, id, modal, setModal }) => {
  const [form] = Form.useForm();

  const {
    dataToEdit,
    createData,
    setDataToEdit,
    updateData,
    getData,
    cargando,
    setCargando,
  } = useContext(CrudContext);

  const [unidad, setUnidad] = useState([]);
  const [cod_producto, setCod_producto] = useState([]);
  const [productoId, setProductoID] = useState("");
  const [categoria, setCategoria] = useState([]);
  const [avatar, setAvatar] = useState(null);

  const productoValue = productoValues(id, productoId);
  const [producto, setProducto] = useState(productoValue);


  const getUnidad = async () => {
    const route = "unidad";
    const route1 = "producto";
    const route2 = "categoria";
    const response = await getData(route);
    const response2 = await getData(route1);
    const response3 = await getData(route2);

    setUnidad(response.data);
    setCod_producto(response2.data);
    setCategoria(response3.data);
  };

  useEffect(() => {
    getUnidad();
  }, []);

  useEffect(() => {
    setProducto((value) => ({ ...value, almacen_id: id }));
  }, [id]);

  useEffect(() => {
    if (cod_producto.length !== 0) {
      const getId = cod_producto.at(-1).id;
      setProductoID(getId);
    } else {
      setProductoID(0);
    }
  }, [cod_producto]);

  const closeModal = () => {
    setModal(false);
    setDataToEdit(null);
    setProducto(productoValue);
    setAvatar(null);
    form.setFieldsValue({});
  };

  useEffect(() => {
    if (dataToEdit !== null) {
      setProducto(dataToEdit);
      form.setFieldsValue(dataToEdit);
    } else {
      setProducto(productoValue);
    }
  }, [dataToEdit]);

  const handleSubmit = async (e) => {

    if (dataToEdit === null) {
      const formData = new FormData();

      formData.set("almacen_id", producto.almacen_id || id);
      formData.set("categoria_id", producto.categoria_id || "");
      formData.set("codigo", parseInt(productoId) + 1 || "");
      formData.set("codigo_barras", producto.codigo_barras || "");
      formData.set("codigo_interno", producto.codigo_interno || "");
      formData.set("costo_total", producto.costo_total || "");
      formData.set("descripcion", producto.descripcion || "");
      formData.set("fecha", producto.fecha || "");
      formData.set("nombre", producto.nombre || "");
      formData.set("observacion", producto.observacion || "");
      formData.set("precio", producto.precio || "");
      formData.set("stock", producto.stock || "");
      formData.set("unidad_id", producto.unidad_id || "");

      avatar?.file && formData.set("image", avatar.file || "");

      const response = await fetch(`${process.env.REACT_APP_BASE}/producto`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data) {
        notificacion(data.status, data.msg);
        closeModal();
        actualizarTabla();
      }
    } else {
      const formData = new FormData();

      formData.append("almacen_id", producto.almacen_id || id);
      formData.append("categoria_id", producto.categoria_id || "");
      formData.append("codigo", parseInt(productoId) + 1 || "");
      formData.append("codigo_barras", producto.codigo_barras || "");
      formData.append("codigo_interno", producto.codigo_interno || "");
      formData.append("costo_total", producto.costo_total || "");
      formData.append("descripcion", producto.descripcion || "");
      formData.append("fecha", producto.fecha || "");
      formData.append("nombre", producto.nombre || "");
      formData.append("observacion", producto.observacion || "");
      formData.append("precio", producto.precio || "");
      formData.append("stock", producto.stock || "");
      formData.append("unidad_id", producto.unidad_id || "");
      formData.set("foto", producto.foto || "");

      avatar?.file && formData.set("image", avatar.file || "");

      const response = await fetch(
        `${process.env.REACT_APP_BASE}/producto/${dataToEdit.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      const data = await response.json();
      if (data) {
        notificacion(data.status, data.msg);
        closeModal();
        actualizarTabla();
      }
    }
  };

  const handleData = (e, text) => {
    if (!text && e.target) {
      const { name, value } = e.target;
      form.setFieldsValue({
        [name]: value,
      });
      setProducto((values) => {
        return { ...values, [name]: value };
      });
    } else {
      form.setFieldsValue({
        [text]: e,
      });
      setProducto((values) => {
        return { ...values, [text]: e };
      });
    }
  };

  const formData = modalRegistroProducto(
    producto,
    handleData,
    productoId,
    categoria,
    unidad
  );

  return (
    <Modal
      className="modal-producto"
      title={dataToEdit ? "Editar producto" : "Registrar producto"}
      open={modal}
      centered
      onCancel={closeModal}
      footer={false}
      width={800}
    >
      <Form
        form={form}
        className="modal-body"
        onFinish={handleSubmit}
        layout="horizontal"
      >
        <section>
          <div className="inputs">
            {formData.map((item, i) => (
              <Form.Item
                className="item"
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
          </div>
          <div className="image">
            <DragAndDrop
              avatar={avatar}
              setAvatar={setAvatar}
              selected={dataToEdit}
            />
          </div>
        </section>

        <Form.Item className="button-container">
          <Button
            onClick={handleSubmit}
            icon={<AiOutlineForm />}
            loading={cargando ? true : false}
          >
            {dataToEdit ? "Editar" : "Registrar"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalRegistrarProducto;

import React, { useEffect, useState, useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { transferenciaLayout } from "../../../data/dataTable";
import Tabla from "../../tabla/Tabla";
import { notificacion } from "../../../helpers/mensajes";
import MainModal from "../../modal/MainModal";
import { Button, DatePicker, Form, Select } from "antd";
import "../styles/modalTransferencia.css";
import { AiOutlineForm } from "react-icons/ai";

const ModalTransferencia = ({ almacen_id, actualizarTabla, id, data }) => {
  const [form] = Form.useForm();

  const {
    getData,
    createData,
    dataToEdit,
    setModal,
    modal,
    cargando,
    setCargando,
  } = useContext(CrudContext);

  const initialValues = {
    almacen_id: almacen_id,
    origen: almacen_id,
    fecha: "",
    producto: "",
    destino: "",
    cantidad: "",
    estado_origen: "",
    estado_destino: "",
  };

  const [almacen, setAlmacen] = useState([]);
  const [producto, setProducto] = useState([]);
  const [productoSelect, setProductoSelect] = useState([]);
  const [productoFinal, setProductoFinal] = useState([]);

  const [almacenDestino, setAlmacenDestino] = useState([]);
  const [transferencia, setTransferencia] = useState(initialValues);
  const [newJson, setNewJson] = useState([]);
  const [idCantidad, setIdCantidad] = useState("");

  const fetchData = async () => {
    const response = await getData("almacen");
    const response1 = await getData("producto");
    setAlmacen(response.data);
    setProducto(response1.data);
    setProductoSelect(
      response1.data.filter((item) => item.almacen_id === almacen_id)
    );
  };

  const closeModal = () => {
    setModal(false);
  };

  //para filtrar el almacen seleccionado de la lista
  useEffect(() => {
    const filterProductoOrigen = producto.filter(
      (item) => transferencia.origen == item.almacen_id
    );

    const filterAlmacen = almacen.filter(
      (item) => parseInt(transferencia.origen) !== item.id
    );
    setProductoFinal(filterProductoOrigen);
    setAlmacenDestino(filterAlmacen);
  }, [transferencia]);

  const handleChange = (e, text, i) => {
    if (!text && e.target) {
      const { name, value } = e.target;
      form.setFieldsValue({
        [name]: value,
      });
      setTransferencia((values) => {
        return { ...values, [name]: value };
      });
    } else {
      form.setFieldsValue({
        [text]: e,
      });
      setTransferencia((values) => {
        return { ...values, [text]: e };
      });
    }
    if (i !== undefined) {
      setIdCantidad(i);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (transferencia.producto !== "" && transferencia.destino !== "") {
      //filtrar el producto seleccionado de la lista
      let productoOrigen;
      let productosDestino;

      productoOrigen = producto.filter(
        (item) => item.id === transferencia.producto
      );
      //todos los productos del almacen de destino
      productosDestino = producto.filter((item) => {
        let result = productoOrigen.find(
          (ele) =>
            ele.codigo_interno !== "" &&
            ele.codigo_interno === item.codigo_interno &&
            item.almacen_id === transferencia.destino
        );
        return result ? result : "";
      });

      if (productosDestino.length > 0) {
        const result = newJson?.filter((item) => {
          const prueba = productosDestino.find(
            (ele) => ele.codigo_interno === item.codigo_interno
          );

          if (prueba) {
            return item;
          } else {
            return prueba;
          }
        });

        if (result.length === 0) {
          const formatData = productosDestino
            .map((item) => {
              return {
                id: productoOrigen?.at(-1)?.id,
                fecha: transferencia.fecha,
                almacen_id: almacen_id,
                almacen_origen: almacen_id,
                almacen_destino: transferencia.destino,
                producto_id: transferencia.producto,
                producto_origen: transferencia.producto,
                producto_destino: item.id,
                nombre: productoOrigen?.at(-1)?.nombre,
                stock: productoOrigen?.at(-1)?.stock,
                stock_origen: productoOrigen?.at(-1)?.stock,
                stock_destino: item.stock,
                cantidad: "",
              };
            })
            .filter((item) => item.stock > 0);

          if (formatData.length > 0) {
            setNewJson((value) => [...value, formatData.at(-1)]);
          } else {
            notificacion(
              500,
              "No se puede agregar el producto, producto sin stock ."
            );
            setTransferencia((value) => ({ ...value, producto: "" }));
          }
        }
      } else {
        // setNewJson([]);
        notificacion(500, "Producto no registrado en almacén de destino.");
        setTransferencia((value) => ({ ...value, producto: "" }));
      }
    }
  }, [transferencia.producto, transferencia.destino]);

  useEffect(() => {
    if (idCantidad !== "" && newJson.length !== 0 && idCantidad !== undefined) {
      setNewJson((state) =>
        state.map((item, i) =>
          i === idCantidad
            ? {
                ...item,
                cantidad: transferencia.cantidad,
              }
            : item
        )
      );
    }
  }, [idCantidad, transferencia.cantidad]);

  const handleSubmit = async (e) => {
    let route = "almacen/transferencia";
    e.preventDefault();

    const cantidadSuperior = newJson.filter(
      (item) => parseInt(item.cantidad) > parseInt(item.stock)
    );

    if (cantidadSuperior.length > 0) {
      notificacion(
        500,
        "No se puede realizar la transferencia, stock insuficiente en uno de los productos."
      );
    } else {
      setCargando(true);
      const response = await createData(newJson, route);
      if (response) {
        notificacion(response.status, response.msg);
        actualizarTabla();
        closeModal();
        setCargando(false);
      }
    }
  };

  const handleDelete = (e) => {
    setNewJson((current) => current.filter((item) => item.id !== e.id));
  };

  const columns = transferenciaLayout(
    handleChange,
    handleDelete,
    transferencia.cantidad
  );
  return (
    <MainModal
      className={"modal-transferencia"}
      title={"Realizar transferencia"}
      open={modal}
      width={800}
      closeModal={closeModal}
    >
      <Form
        form={form}
        className="modal-body"
        onFinish={handleSubmit}
        layout="horizontal"
      >
        <Form.Item name="fecha">
          <DatePicker
            defaultValue={transferencia.fecha}
            style={{
              width: "100%",
            }}
            format={"YYYY-MM-DD"}
            name="fecha"
            placeholder="Fecha"
            onChange={(e) => handleChange(e, "fecha")}
          />
        </Form.Item>
        <Form.Item
          name="destino"
          rules={[
            {
              required: true,
              message: "Campo obligatorio!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Almacén destino"
            name="destino"
            value={transferencia.destino}
            optionFilterProp="children"
            onChange={(e) => handleChange(e, "destino")}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={almacenDestino.map((item) => {
              return {
                label: item.nombre,
                value: item.id,
              };
            })}
          />
        </Form.Item>

        <Form.Item name="producto">
          <Select
            showSearch
            placeholder="Seleccione un producto"
            name="producto"
            value={transferencia.producto}
            optionFilterProp="children"
            onChange={(e) => handleChange(e, "producto")}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={productoSelect?.map((item) => {
              return {
                label: item.nombre,
                value: item.id,
              };
            })}
          />
        </Form.Item>
      </Form>

      <div className="tabla-container">
        <Tabla columns={columns} table={newJson} />
      </div>

      {newJson.length !== 0 ? (
        <div className="button-transferir">
          <Button
            onClick={handleSubmit}
            icon={<AiOutlineForm />}
            loading={cargando ? true : false}
          >
            Transferir
          </Button>
        </div>
      ) : (
        ""
      )}
    </MainModal>
  );
};

export default ModalTransferencia;

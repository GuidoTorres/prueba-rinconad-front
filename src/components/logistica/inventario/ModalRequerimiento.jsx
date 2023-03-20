import React from "react";
import { useEffect, useState, useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { requerimientoTable } from "../../../data/dataTable";
import { requerimientoValues } from "../../../data/initalValues";
import { Select, Modal, Input, Button } from "antd";
import { notificacion } from "../../../helpers/mensajes";
import { AiOutlineForm } from "react-icons/ai";
import Tabla from "../../tabla/Tabla";
import "../styles/modalRequerimientos.css";

const ModalRequerimiento = ({ id, data, actualizarTabla }) => {
  const {
    dataToEdit,
    setModal3,
    createData,
    updateData,
    setDataToEdit,
    getData,
    modal3,
  } = useContext(CrudContext);

  const [codRequerimiento, setCodRequerimiento] = useState("");
  const initialValues = requerimientoValues();
  const [requerimiento, setRequerimiento] = useState(initialValues);
  const [newJson, setNewJson] = useState([]);
  const [area, setArea] = useState([]);
  const [idRequerimiento, setIdRequerimiento] = useState("");
  const [trabajador, setTrabajador] = useState([]);
  const [idReq, setIdReq] = useState("");
  const [productoEditar, setProductoEditar] = useState([]);

  const closeModal = () => {
    setModal3(false);
    setDataToEdit(null);
    setNewJson([]);

  };

  const getRequerimientoCodigo = async () => {
    const route = "requerimiento";
    const route1 = "area";
    const route2 = "requerimiento/trabajador";
    const route3 = "requerimiento/last/id";

    const response = getData(route);
    const response1 = getData(route1);
    const response2 = getData(route2);
    const response3 = getData(route3);

    const all = await Promise.all([response, response1, response2, response3]);

    setCodRequerimiento(all[0].data);
    setArea(all[1].data);
    setTrabajador(all[2].data);
    setIdReq(all[3].data);
  };
  useEffect(() => {
    setRequerimiento((value) => ({ ...value, almacen_id: id }));
  }, [id]);

  useEffect(() => {
    setRequerimiento((value) => ({ ...value, codigo: idReq }));
  }, [idReq]);


  useEffect(() => {
    getRequerimientoCodigo();
  }, []);
  const getListaProducto = async (id) => {
    const response = await getData(`almacen/producto/${id}`);
    setProductoEditar(response.data);
  };

  useEffect(() => {
    if (dataToEdit === null) {
      setProductoEditar(data);
    }
  }, [data, dataToEdit]);

  //para editar
  useEffect(() => {
    if (dataToEdit !== null) {
      setRequerimiento((value) => ({
        ...value,
        codigo: dataToEdit.id,
        fecha_pedido: dataToEdit?.fecha_pedido,
        fecha_entrega: dataToEdit?.fecha_entrega,
        solicitante: dataToEdit?.solicitante,
        area: dataToEdit?.area,
        celular: dataToEdit?.celular,
        proyecto: dataToEdit?.proyecto,
        cantidad: dataToEdit?.cantidad,
        dni: dataToEdit?.dni,
      }));
    }
  }, [dataToEdit]);

  // para mostrar los productos en la tabla al editar
  useEffect(() => {
    if (dataToEdit && requerimiento.producto === "") {
      const formatData = dataToEdit?.requerimiento_productos?.map((item) => {
        return {
          codigo_producto: item?.producto?.id,
          // codigo: requerimiento?.codigo,
          fecha_pedido: requerimiento.fecha_pedido,
          fecha_entrega: requerimiento.fecha_entrega,
          solicitante: requerimiento.solicitante,
          area: requerimiento.area,
          celular: requerimiento.celular,
          proyecto: requerimiento.proyecto,
          producto_id: item?.id,
          descripcion: item?.producto?.nombre,
          cantidad: item?.cantidad,
          unidad: item?.producto?.unidad?.nombre,
          almacen_id: item?.producto?.almacen_id,
          stock: item?.producto?.stock,
          dni: requerimiento.dni,
        };
      });
      setNewJson(formatData);

      getListaProducto(dataToEdit.almacen_id);
    }
  }, [
    dataToEdit,
    requerimiento.fecha_pedido,
    requerimiento.fecha_entrega,
    requerimiento.solicitante,
    requerimiento.area,
    requerimiento.celular,
    requerimiento.proyecto,
    requerimiento.dni,
    requerimiento.codigo,
  ]);

  // para obtener al trabajador en base al dni
  useEffect(() => {
    if (requerimiento?.dni?.length >= 7) {
      const filterDni = trabajador?.filter(
        (item) => item.dni === requerimiento.dni
      );
      if (filterDni.length > 0) {
        const traba = filterDni?.at(-1);
        setRequerimiento((values) => ({
          ...values,
          solicitante: traba?.nombre,
          area:
            traba.contrato.length > 0 &&
            traba?.contrato
              ?.filter((item) => item?.finalizado === false)
              ?.at(-1)?.area,
        }));
      }
    }
  }, [requerimiento.dni, trabajador]);

  // filtrar el producto para llenar la tabla
  useEffect(() => {
    if (requerimiento.producto) {
      let filterProducto = productoEditar?.filter(
        (item) => item.id === requerimiento.producto
      );

      if (filterProducto.length > 0) {
        const formatData = filterProducto?.map((item) => {
          return {
            codigo_producto: item?.id,
            codigo: requerimiento?.codigo,
            fecha_pedido: requerimiento?.fecha_pedido,
            fecha_entrega: requerimiento?.fecha_entrega,
            solicitante: requerimiento?.solicitante,
            area: requerimiento?.area,
            celular: requerimiento?.celular,
            proyecto: requerimiento?.proyecto,
            producto_id: item?.id,
            descripcion: item?.nombre,
            cantidad: requerimiento?.cantidad,
            unidad: item?.unidad,
            almacen_id: id,
            stock: item?.stock,
            dni: requerimiento?.dni,
          };
        });

        if (formatData.length > 0) {
          //para evitar repetir productos

          const result = newJson?.filter((item) => {
            const prueba = formatData.find(
              (ele) => ele.codigo_producto === item.codigo_producto
            );
            if (prueba) {
              return item;
            } else {
              return prueba;
            }
          });

          if (result.length === 0) {
            console.log("buscador producto");
            setNewJson((value) => [...value, formatData.at(-1)]);
          }
        }
      }
    }
  }, [requerimiento, data, id, productoEditar, dataToEdit, newJson]);

  // para actualizar la cantidad en la tabla
  useEffect(() => {
    if (idRequerimiento !== "" && idRequerimiento !== undefined) {
      setNewJson((state) =>
        state?.map((item, i) =>
          i === idRequerimiento
            ? { ...item, cantidad: requerimiento.cantidad }
            : item
        )
      );
    }
  }, [idRequerimiento, requerimiento]);

  const handleData = (e, i, text) => {
    if (i !== undefined) {
      setIdRequerimiento(i);
    }

    if (!text && e.target) {
      const { name, value } = e.target;

      setRequerimiento((values) => {
        return { ...values, [name]: value };
      });
    } else {
      setRequerimiento((values) => {
        return { ...values, [text]: e };
      });
    }
  };

  const handleSubmit = async (e) => {
    let route = "requerimiento";
    let routeUpdate = "requerimiento/producto";
    e.preventDefault();

    if (dataToEdit === null) {
      const response = await createData(newJson, route);
      if (response.status === 200) {
        notificacion(response.status, response.msg);
        closeModal();
      }
    } else {
      const response = await updateData(newJson, dataToEdit.id, routeUpdate);
      if (response.status === 200) {
        notificacion(response.status, response.msg);
        actualizarTabla();
        closeModal();
      }
    }
  };

  // para la edicion del requerimiento
  const handleDelete = (e) => {
    setNewJson((value) =>
      value.filter((item) => item.producto_id !== e.producto_id)
    );
    setRequerimiento(initialValues);
  };

  const columns = requerimientoTable(
    handleData,
    handleDelete,
    requerimiento,
    dataToEdit
  );

  return (
    <Modal
      destroyOnClose={true}
      className="modal-requerimiento"
      title={
        dataToEdit === null ? "Registrar requerimiento" : "Editar requerimiento"
      }
      open={modal3}
      centered
      onCancel={closeModal}
      footer={null}
      width={800}
    >
      <form className="modal-body">
        <div className="container">
          <label>Código requerimiento</label>
          <Input
            disabled
            value={requerimiento.codigo}
            type="text"
            name="codigo"
            onChange={handleData}
          />
        </div>
        <div className="container">
          <label>Fecha de Requerimiento</label>
          <Input
            type="date"
            placeholder="Fecha de pedido"
            name="fecha_pedido"
            onChange={handleData}
            value={requerimiento.fecha_pedido}
          />
        </div>
        <div className="container">
          <label>Fecha de entrega</label>
          <Input
            type="date"
            placeholder="Fecha de entrega"
            name="fecha_entrega"
            value={requerimiento.fecha_entrega}
            onChange={handleData}
          />
        </div>
        <div className="container">
          <label>Dni</label>
          <Input
            type="number"
            name="dni"
            placeholder="Dni"
            value={requerimiento.dni}
            onChange={handleData}
          />
        </div>
        <div className="container">
          <label>Nombre solicitante</label>
          <Input
            value={requerimiento.solicitante}
            type="text"
            name="solicitante"
            placeholder="Solicitante"
            onChange={handleData}
          />
        </div>
        <div className="container">
          <label>Área</label>
          <Select
            placeholder="Área"
            name="area"
            value={requerimiento.area}
            onChange={(e) => handleData(e, null, "area")}
            options={area.map((item, i) => {
              return {
                value: item.nombre,
                label: item.nombre,
              };
            })}
          />
        </div>
        <div className="container">
          <label>Celular</label>
          <Input
            value={requerimiento.celular}
            placeholder="Celular"
            type="text"
            name="celular"
            onChange={handleData}
          />
        </div>
        <div className="container">
          <label>Proyecto/Actividad</label>
          <Input
            value={requerimiento.proyecto}
            placeholder="Proyecto"
            type="text"
            name="proyecto"
            onChange={handleData}
          />
        </div>

        <div className="container">
          <label>Productos</label>

          <Select
            showSearch
            optionFilterProp="children"
            name="producto"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            onChange={(e) => handleData(e, null, "producto")}
            options={productoEditar?.map((item, i) => {
              return {
                value: item.id,
                label: item.nombre,
              };
            })}
          />
        </div>
      </form>
      <br />

      <div>
        <Tabla columns={columns} table={newJson} filas={5} />
      </div>

      <div className="button-container">
        {newJson?.length !== 0 ? (
          <Button icon={<AiOutlineForm />} onClick={handleSubmit}>
            Guardar
          </Button>
        ) : (
          ""
        )}
      </div>
    </Modal>
  );
};

export default ModalRequerimiento;

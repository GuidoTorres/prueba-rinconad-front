import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { registrarEntrada } from "../../../data/dataTable";
import { entradaSalidaValues } from "../../../data/initalValues";
import Tabla from "../../tabla/Tabla";
import { Select, Modal, Button, Input } from "antd";
import { notificacion } from "../../../helpers/mensajes";
import ModalRegistrarProducto from "./ModalRegistrarProducto";
import "../styles/modalRegistrarEntrada.css";
import dayjs from "dayjs";
import { AiOutlineForm } from "react-icons/ai";

const ModalRegistrarEntradaSalida = ({
  almacen_id,
  actualizarTabla,
  productos,
  actualizarProductos,
}) => {
  const {
    dataToEdit,
    setModal2,
    tipo,
    setDataToEdit,
    createData,
    updateData,
    modal,
    setModal,
    getData,
    getDataById,
    modal2,
    cargando,
    setCargando,
    data1,
    setData1,
  } = useContext(CrudContext);

  const initialValues = entradaSalidaValues(tipo, almacen_id);
  const [entrada, setEntrada] = useState(initialValues);
  const [newJson, setNewJson] = useState([]);
  const [area, setArea] = useState([]);
  const [entradaId, setEntradaId] = useState([]);
  const [idCantidad, setIdCantidad] = useState("");
  const [trabajador, setTrabajador] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [pedidoEntrada, setPedidoEntrada] = useState([]);
  const [productoAlmacen, setProductoAlmacen] = useState([]);
  const [pedidoAlmacen, setPedidoAlmacen] = useState([]);
  const [buscador, setBuscador] = useState("");
  const [requerimiento, setRequerimiento] = useState([]);
  const [registrarProducto, setRegistrarProducto] = useState(false);

  const getArea = async () => {
    const route = "area";
    const route1 = `entrada`;
    const route2 = "trabajador";
    const route3 = "pedido/id";
    const route4 = "pedido/entrada";
    const route5 = "requerimiento";

    const response = getData(route);
    const response1 = getData(route1);
    const response2 = getData(route2);
    const response3 = getData(route3);
    const response4 = getData(route4);
    const response5 = getData(`almacen/producto/${almacen_id}`);
    const response6 = getData(route5);

    const all = await Promise.all([
      response,
      response1,
      response2,
      response3,
      response4,
      response5,
      response6,
    ]);

    setArea(all[0].data);
    setEntradaId(all[1].data);
    setTrabajador(all[2].data);
    setPedido(all[3].data);
    setPedidoEntrada(all[4].data);
    setProductoAlmacen(all[5].data);
    setRequerimiento(all[6].data);
  };

  const closeModal = () => {
    setModal2(false);
    setDataToEdit(null);
    setEntrada(initialValues);
    setNewJson([]);
    setCargando(false);
  };

  const getProductoAlmacen = async () => {
    const response = await getData(`almacen/producto/${almacen_id}`);
    setData1(response.data);
  };

  useEffect(() => {
    getArea();
  }, []);

  useEffect(() => {
    setEntrada((value) => ({ ...value, almacen_id: almacen_id }));
  }, [almacen_id]);

  //para filtrar pedidos y requerimientos en base asu estado
  useEffect(() => {
    const filter = pedido
      .map((item) => {
        return {
          estado_pedido: item.estado_pedido,
          id: item.id,
          requerimiento_pedidos: item.requerimiento_pedidos.filter(
            (dat) => dat.almacen_id === almacen_id && dat.estado === null
          ),
        };
      })
      .flat()
      .filter((item) => item.requerimiento_pedidos.length > 0);

    setPedidoAlmacen(filter);
  }, [pedido, almacen_id]);

  // para juntar productos iguales de requerimientos en uno solo entrada
  useEffect(() => {
    if (
      entrada.codigo_pedido !== "" &&
      entrada.codigo_pedido !== "-1" &&
      dataToEdit === null &&
      tipo === "entrada"
    ) {
      const filterData = pedidoEntrada.filter(
        (item) =>
          item.id === entrada.codigo_pedido &&
          item.requerimiento_pedidos
            .map((item) => item.requerimiento)
            .filter((item) => item.almacen_id === almacen_id)
      );

      const formatData =
        filterData.length > 0 &&
        filterData
          .map((item) =>
            item?.requerimiento_pedidos?.filter(
              (data) => data.requerimiento.almacen_id === almacen_id
            )
          )
          .flat()
          .map((item) => item.requerimiento_id)
          .toString();

      const formatProducto =
        filterData.length > 0 &&
        filterData
          .map((item) => item?.requerimiento_pedidos)
          .flat()
          .map((item) => item?.requerimiento?.requerimiento_productos)
          .flat()
          .map((item) => {
            return {
              cantidad: parseInt(item?.cantidad),
              almacen_id: item?.producto?.almacen_id,
              categoria: item?.producto?.categoria,
              id: item?.producto_id,
              codigo_barras: item?.producto?.codigo_barras,
              codigo_interno: item?.producto?.codigo_interno,
              descripcion: item?.producto?.descripcion,
              fecha: item?.producto?.fecha,
              producto_id: item?.producto_id,
              nombre: item?.producto?.nombre,
              precio: item?.producto?.precio,
              stock: item?.producto?.stock,
              unidad: item?.producto?.unidad?.nombre,
              encargado: filterData
                ?.map(
                  (data) =>
                    data?.requerimiento_pedidos?.at(-1)?.requerimiento
                      ?.solicitante
                )
                .flat()
                .toString(),
              dni: filterData
                ?.map(
                  (data) =>
                    data?.requerimiento_pedidos?.at(-1)?.requerimiento?.dni
                )
                .flat()
                .toString(),
            };
          });

      console.log("====================================");
      console.log(formatProducto);
      console.log("====================================");

      const mergeProducto =
        formatProducto.length > 0 &&
        formatProducto.reduce((value, current) => {
          let temp = value.find((o) => o.producto_id == current.producto_id);
          if (!temp) {
            value.push(current);
          } else {
            temp.cantidad += current.cantidad;
            Object.assign(temp);
          }
          return value;
        }, []);

      const formatMerge =
        mergeProducto.length > 0 &&
        mergeProducto
          .map((item) => {
            return {
              cantidad: item?.cantidad,
              almacen_id: item?.almacen_id,
              categoria: item?.categoria,
              id: item?.id,
              codigo_barras: item?.codigo_barras,
              codigo_interno: item?.codigo_interno,
              descripcion: item?.descripcion,
              fecha: entrada?.fecha,
              producto_id: item?.producto_id,
              nombre: item?.nombre,
              precio: item?.precio,
              stock: item?.stock,
              unidad: item?.unidad,
              costo:
                parseInt(item?.cantidad) * parseFloat(item?.precio).toFixed(2),
              tipo: entrada?.tipo,
              codigo: entrada?.codigo,
              motivo: entrada?.motivo,
              encargado: entrada?.encargado,
              codigo_compra: entrada?.codigo_compra,
              boleta: entrada?.boleta,
              codigo_requerimiento: formatData,
              dni: entrada.dni,
              codigo_pedido: entrada.codigo_pedido,
            };
          })
          .filter((item) => item.almacen_id === almacen_id);

      if (formatMerge.length > 0) {
        setEntrada((value) => ({ ...value, codigo_requerimiento: formatData }));
        setNewJson(formatMerge);
      }
    }
  }, [
    entrada.fecha,
    entrada.tipo,
    entrada.codigo,
    entrada.motivo,
    entrada.encargado,
    entrada.codigo_compra,
    entrada.dni,
    entrada.codigo_pedido,
    entrada.costo_total,
    dataToEdit,
    entrada.boleta,
    pedidoEntrada,
    almacen_id,
    tipo,
  ]);

  // // para juntar productos iguales de requerimientos en uno solo salida
  useEffect(() => {
    if (
      tipo === "salida" &&
      dataToEdit === null &&
      entrada.codigo_requerimiento
    ) {
      const filterRequerimiento = requerimiento.filter(
        (item) => item.id === entrada.codigo_requerimiento
      );

      setEntrada((value) => ({
        ...value,
        encargado: filterRequerimiento?.at(-1)?.solicitante,
        personal: filterRequerimiento?.at(-1)?.solicitante,
        dni: filterRequerimiento?.at(-1)?.dni,
        area_id: filterRequerimiento?.at(-1)?.area,
      }));

      console.log(filterRequerimiento);
      const formatProducto = filterRequerimiento
        ?.at(-1)
        ?.requerimiento_productos?.map((item) => {
          return {
            id: item?.producto_id,
            cantidad: item?.cantidad,
            nombre: item?.producto?.nombre,
            unidad: item?.unidad?.nombre,
            stock: item?.producto?.stock,
            costo: parseInt(item?.cantidad) * parseInt(item?.producto?.precio),
            costo_total: entrada.costo_total,
            motivo: entrada?.motivo,
            fecha: entrada?.fecha,
            dni: entrada?.dni,
            encargado: entrada?.personal,
            area_id: entrada?.area_id,
            codigo_requerimiento: entrada?.codigo_requerimiento,
            tipo: tipo,
            producto_id: item.producto_id,
            almacen_id: almacen_id,
            codigo: "",
          };
        });
      if (formatProducto?.length > 0) {
        setNewJson(formatProducto);
      }
    }
  }, [
    entrada.codigo_requerimiento,
    entrada.costo_total,
    entrada.motivo,
    entrada.fecha,
    entrada.personal,
    entrada.dni,
    dataToEdit,
    tipo,
    requerimiento,
    almacen_id,
    entrada.area_id,
  ]);

  //para calcular el costo total de de los productos
  useEffect(() => {
    let costo =
      newJson.length >= 0 &&
      newJson?.reduce(
        (acc, value) => parseFloat(acc) + parseFloat(value.costo),
        0
      );
    setEntrada((value) => ({ ...value, costo_total: costo }));
  }, [newJson]);

  useEffect(() => {
    if (dataToEdit) {
      setEntrada(dataToEdit);
    } else {
      setEntrada(initialValues);
    }
  }, [dataToEdit]);

  // si es edicion llenar el formulario con data del servidor
  useEffect(() => {
    if (dataToEdit) {
      const formatData = dataToEdit?.producto_entrada_salidas?.map((item) => {
        return {
          motivo: entrada.motivo,
          fecha: dayjs(entrada.fecha)?.format("YYYY-MM-DD"),
          encargado: entrada?.encargado,
          codigo_compra: entrada?.codigo_compra,
          codigo_requerimiento: entrada?.codigo_requerimiento,
          boleta: entrada?.boleta,
          cantidad: parseInt(item?.cantidad),
          costo: item?.costo,
          nombre: item?.producto?.nombre,
          unidad: item?.producto?.unidad?.nombre,
          id: item?.producto?.id,
          codigo_producto: item?.producto?.id,
          codigo: item?.producto?.codigo,
          producto_id: item?.producto?.id,
          tipo: tipo,
          stock: item?.producto?.stock,
          dni: entrada.dni,
          area_id: entrada.area_id,
          personal: entrada.encargado,
        };
      });

      setNewJson(formatData);
    }
  }, [
    dataToEdit,
    entrada.motivo,
    entrada.fecha,
    entrada.encargado,
    entrada.codigo_requerimiento,
    entrada.personal,
    entrada.boleta,
    tipo,
    entrada.codigo_compra,
    entrada.dni,
    entrada.area_id,
  ]);

  // para obtener al trabajador en base al dni
  useEffect(() => {
    if (entrada?.dni?.length >= 7) {
      const filterDni = trabajador?.filter((item) => item.dni === entrada.dni);

      const format = filterDni.map((item) => {
        return {
          nombre:
            item?.apellido_paterno +
            " " +
            item?.apellido_materno +
            " " +
            item?.nombre,
          area: item?.contrato
            ?.filter((data) => data?.finalizado === false)
            .at(-1)?.area,
        };
      });

      if (filterDni.length > 0) {
        const traba = format?.at(-1);
        setEntrada((values) => ({
          ...values,
          encargado: traba?.nombre,
          personal: traba?.nombre,
          area_id: traba?.area,
        }));
        // setAreaId(traba?.area);
      }
    }
  }, [
    entrada.dni,
    entrada.motivo,
    entrada.fecha,
    entrada.encargado,
    entrada.codigo_compra,
    entrada.requerimiento,
    entrada.boleta,
  ]);

  // agregar productos a la tabla si se usa el buscador
  useEffect(() => {
    if (entrada.producto) {
      const filterProducto = data1?.filter(
        (item) => item.id === entrada.producto
      );

      //dar formato para entrada o salida
      const formatData =
        tipo === "entrada" && filterProducto?.length > 0
          ? filterProducto.map((item) => {
              return {
                id: item.id,
                codigo_producto: item.id,
                nombre: item.nombre,
                cantidad: entrada.cantidad,
                unidad: item.unidad,
                boleta: entrada.boleta,
                motivo: entrada.motivo,
                categoria: entrada.categoria,
                codigo: parseInt(entradaId[entradaId.length - 1]?.id) + 1,
                codigo_compra: entrada.codigo_compra,
                codigo_requerimiento: entrada.codigo_requerimiento,
                encargado: entrada.encargado,
                fecha: entrada.fecha,
                producto_id: item.id,
                tipo: entrada.tipo,
                almacen_id: almacen_id,
                producto: entrada.producto,
                stock: parseInt(item.stock),
                nuevo_stock: parseInt(item.stock) + parseInt(entrada.cantidad),
                costo_inicial: parseFloat(item?.precio),
                costo: parseFloat(item.precio).toFixed(2),
              };
            })
          : tipo === "salida" && filterProducto?.length > 0
          ? filterProducto?.map((item) => {
              return {
                id: item?.id,
                codigo_producto: item?.id,
                nombre: item?.nombre,
                cantidad: entrada?.cantidad,
                unidad: item?.unidad,
                boleta: entrada?.boleta,
                motivo: entrada?.motivo,
                categoria: entrada?.categoria,
                codigo: parseInt(entradaId[entradaId?.length - 1]?.id) + 1,
                codigo_compra: entrada?.codigo_compra,
                codigo_requerimiento: entrada?.codigo_requerimiento,
                encargado: entrada?.encargado,
                fecha: entrada?.fecha,
                producto_id: item?.id,
                tipo: entrada?.tipo,
                almacen_id: almacen_id,
                area: entrada?.area,
                stock: parseInt(item?.stock),
                costo_inicial: parseFloat(item?.precio),
                costo: parseFloat(item?.precio).toFixed(2),
              };
            })
          : "";
    
      if (formatData.length > 0) {
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
          setNewJson((value) => [...value, formatData.at(-1)]);
        }
      }
    }
  }, [entrada, newJson]);

  //para actualizar la cantidad y el costo en la tabla
  useEffect(() => {
    if (idCantidad !== "" && newJson.length !== 0 && idCantidad !== undefined) {
      setNewJson((state) =>
        state.map((item, i) =>
          i === idCantidad
            ? {
                ...item,
                cantidad: entrada.cantidad,
                costo:
                  entrada.cantidad !== ""
                    ? parseFloat(item.costo_inicial) *
                      parseFloat(entrada.cantidad)
                    : item.costo_inicial,
              }
            : item
        )
      );
    }
  }, [idCantidad, entrada.cantidad]);

  const handleSubmit = async (e) => {
    let route = "entrada";
    e.preventDefault();

    if (tipo === "salida") {
      const validarCantidad = newJson.filter(
        (item) =>
          parseInt(item.cantidad) > parseInt(item.stock) &&
          item.tipo === "salida"
      );

      const validarStock = newJson.filter((item) => parseInt(item.stock) <= 0);

      if (validarCantidad.length > 0) {
        notificacion(
          500,
          "No se puede realizar la salida, stock insuficiente."
        );
      }
      if (validarCantidad.length === 0 && validarStock.length === 0) {
        if (dataToEdit === null) {
          setCargando(true);
          const response = await createData(newJson, route);
          if (response) {
            notificacion(response.status, response.msg);
            closeModal();
            actualizarTabla();
            setCargando(false);
            actualizarProductos();
          }
        } else {
          setCargando(true);
          const response = await updateData(newJson, dataToEdit.id, route);
          if (response) {
            notificacion(response.status, response.msg);
            closeModal();
            actualizarTabla();
            setCargando(false);
            actualizarProductos();
          }
        }
      }
    } else {
      if (dataToEdit === null) {
        setCargando(true);
        const response = await createData(newJson, route);
        if (response) {
          notificacion(response.status, response.msg);
          closeModal();
          actualizarTabla();
          setCargando(false);
          actualizarProductos();
        }
      } else {
        setCargando(true);
        const response = await updateData(newJson, dataToEdit.id, route);
        if (response) {
          notificacion(response.status, response.msg);
          closeModal();
          actualizarTabla();
          setCargando(false);
          actualizarProductos();
        }
      }
    }
  };

  const handleData = (e, i, text) => {
    if (e.target) {
      const { name, value } = e.target;

      setEntrada((values) => {
        return { ...values, [name]: value };
      });

      if (i !== undefined) {
        setIdCantidad(i);
      }
    }
    if (text) {
      setEntrada((values) => {
        return { ...values, [text]: e };
      });
    }
  };

  const handleDelete = (e) => {
    console.log(newJson);
    console.log(e);
    setNewJson((current) => current.filter((item) => item.id !== e.id));
    setEntrada(value => ({...value, producto: ""}))
  };

  const columns = registrarEntrada(
    handleData,
    handleDelete,
    entrada.cantidad,
    dataToEdit,
    entrada?.codigo_pedido,
    newJson?.cantidad,
    entrada.codigo_requerimiento,
    tipo
  );

  return (
    <>
      <Modal
        destroyOnClose={true}
        className="modal-registrar-entrada"
        title={dataToEdit ? `Editar ${tipo}` : `Registrar ${tipo}`}
        open={modal2}
        centered
        onCancel={closeModal}
        footer={null}
        width={950}
      >
        <form className="modal-body">
          <div className="container">
            <label>Código</label>
            <Input
              value={parseInt(entradaId.at(-1)?.id) + 1 || 1}
              type="text"
              name="codigo"
              disabled
              onChange={handleData}
            />
          </div>
          <div className="container">
            <label>Motivo de {tipo}</label>

            <Input
              placeholder={`Motivo de ${tipo}`}
              value={entrada.motivo}
              type="text"
              name="motivo"
              onChange={handleData}
            />
          </div>
          <div className="container">
            <label>Fecha de {tipo}</label>
            <Input
              type="date"
              placeholder="Fecha "
              className="fecha"
              name="fecha"
              defaultValue={entrada.fecha}
              onChange={handleData}
            />
          </div>

          <div className="container">
            <label>Dni</label>
            <Input
              placeholder="Dni"
              type="number"
              name="dni"
              value={entrada.dni}
              onChange={handleData}
            />
          </div>
          <div className="container">
            {tipo === "entrada" ? (
              <>
                <label>Encargado</label>
                <Input
                  placeholder="Encargado"
                  type="text"
                  name="encargado"
                  value={entrada.encargado}
                  onChange={handleData}
                />
              </>
            ) : (
              <>
                <label>Personal</label>
                <Input
                  placeholder="Personal"
                  type="text"
                  name="personal"
                  value={entrada.personal}
                  onChange={handleData}
                />
              </>
            )}
          </div>
          <div className="container">
            {tipo === "entrada" ? (
              <>
                <label>Código orden de compra</label>
                <Input
                  placeholder="Código orden de compra"
                  type="text"
                  name="codigo_compra"
                  value={entrada.codigo_compra}
                  onChange={handleData}
                />
              </>
            ) : (
              <>
                <label>Área</label>
                <Select
                  placeholder="Área"
                  name="area_id"
                  value={entrada.area_id}
                  onChange={(e) => handleData(e, null, "area_id")}
                  options={area.map((item, i) => {
                    return {
                      label: item.nombre,
                      value: item.id,
                    };
                  })}
                />
              </>
            )}
          </div>
          {tipo === "entrada" ? (
            <div>
              <label>Boleta/Factura</label>
              <Input
                placeholder="Boleta/Factura"
                type="text"
                name="boleta"
                value={entrada.boleta}
                onChange={handleData}
              />
            </div>
          ) : (
            <div style={{ display: "none", width: "0", height: "0" }}></div>
          )}
          {tipo === "entrada" ? (
            <div className="container">
              <label>Código de pedido</label>
              <Select
                placeholder="Codigo de pedido"
                name="codigo_pedido"
                value={entrada.codigo_pedido}
                onChange={(e) => handleData(e, null, "codigo_pedido")}
              >
                <Select.Option value="-1">Ninguno</Select.Option>
                {pedidoAlmacen?.map((item, i) => (
                  <Select.Option value={item.id}>{item.id}</Select.Option>
                ))}
              </Select>
            </div>
          ) : (
            <div style={{ display: "none", width: "0", height: "0" }}></div>
          )}
          <div className="container">
            <label>Código de requerimiento</label>

            <Select
              disabled={
                entrada.codigo_pedido !== "" && tipo === "entrada"
                  ? true
                  : false
              }
              placeholder="Código de requerimiento"
              name="codigo_requerimiento"
              value={entrada.codigo_requerimiento}
              onChange={(e) => handleData(e, null, "codigo_requerimiento")}
            >
              <Select.Option value="-1">Ninguno</Select.Option>
              {requerimiento
                ?.filter(
                  (item) =>
                    item.almacen_id === almacen_id &&
                    item.estado !== "Entregado"
                )
                .map((item, i) => (
                  <Select.Option value={item.id}>{item.id}</Select.Option>
                ))}
            </Select>
          </div>
          <div className="container">
            <label>Productos</label>

            <Select
              placeholder="Ingrese un producto"
              showSearch
              optionFilterProp="children"
              name="producto"
              disabled={
                entrada.codigo_pedido !== "" && entrada.codigo_pedido !== "-1"
                  ? true
                  : false
              }
              // value={buscador}
              onSearch={(e) => setBuscador(e)}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onChange={(e) => handleData(e, null, "producto")}
              options={productos.map((item, i) => {
                return {
                  value: item.id,
                  label: item.nombre,
                };
              })}
            />
          </div>

          <div className="productos">
            {tipo === "entrada" ? (
              <div className="agregar">
                <Button onClick={() => setRegistrarProducto(true)}>+</Button>
              </div>
            ) : (
              ""
            )}
          </div>
        </form>
        <div className="tabla">
          <Tabla columns={columns} table={newJson} />
        </div>

        {newJson.length > 0 ? (
          <label htmlFor="">
            <strong>Costo total:</strong> {entrada.costo_total}
          </label>
        ) : (
          ""
        )}
        <div className="button-container">
          {newJson && newJson?.length !== 0 ? (
            <Button
              onClick={handleSubmit}
              icon={<AiOutlineForm />}
              loading={cargando ? true : false}
            >
              Guardar
            </Button>
          ) : (
            ""
          )}
        </div>
      </Modal>

      {registrarProducto && (
        <ModalRegistrarProducto
          id={almacen_id}
          modal={registrarProducto}
          setModal={setRegistrarProducto}
          actualizarTabla={getProductoAlmacen}
        />
      )}
    </>
  );
};

export default ModalRegistrarEntradaSalida;

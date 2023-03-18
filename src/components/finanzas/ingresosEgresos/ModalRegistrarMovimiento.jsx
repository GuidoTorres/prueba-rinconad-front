import { Form, Button } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineForm } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { modalRegistrarMovimiento } from "../../../data/FormValues";
import MainModal from "../../modal/MainModal";
import { IngresoEgresoValues } from "../../../data/initalValues";
import { notificacion } from "../../../helpers/mensajes";
import "../styles/modalRegistrarMovimiento.css";

const ModalRegistrarMovimiento = ({ id, getSaldo }) => {
  const [form] = Form.useForm();

  const {
    setModal2,
    dataToEdit,
    modal2,
    setDataToEdit,
    cargando,
    setCargando,
    getData,
    createData,
  } = useContext(CrudContext);
  const [sucursal, setSucursal] = useState([]);
  const [socio, setSocio] = useState([]);
  const [area, setArea] = useState([]);
  const [data, setData] = useState([]);
  const [trabajador, setTrabajador] = useState([]);
  const [proveedor, setProveedor] = useState([]);
  const [unidad, setUnidad] = useState([]);
  const [categoria, setCategoria] = useState([]);

  const ingresoValues = IngresoEgresoValues(id);

  const getAll = async () => {
    const route1 = "socio";
    const route2 = "area";
    const route3 = "sucursal";
    const route4 = "proveedor";
    const route5 = "finanzas/trabajador";
    const route6 = "unidad";
    const route7 = "categoria";

    const socioData = getData(route1);
    const areaData = getData(route2);
    const sucursalData = getData(route3);
    const proveedorData = getData(route4);
    const trabajadorData = getData(route5);
    const unidadData = getData(route6);
    const categoriaData = getData(route7);

    const all = await Promise.all([
      socioData,
      areaData,
      sucursalData,
      proveedorData,
      trabajadorData,
      unidadData,
      categoriaData,
    ]);
    setSocio(all[0].data);
    setArea(all[1].data);
    setData(all[2].data);
    setProveedor(all[3].data);
    setTrabajador(all[4].data);
    setUnidad(all[5].data);
    setCategoria(all[6].data);
  };
  useEffect(() => {
    if (dataToEdit) {
      setSucursal(dataToEdit);
      form.setFieldsValue(dataToEdit);
    } else {
      setSucursal(ingresoValues);
    }
  }, [dataToEdit]);

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (sucursal?.dni?.length > 7) {
      const filterTrabajador = trabajador
        .filter((item) => item.dni === sucursal.dni)
        .flat();
      if (filterTrabajador.length > 0) {
        const nombre =
          filterTrabajador.length > 0
            ? filterTrabajador.at(-1)?.nombre +
              " " +
              filterTrabajador.at(-1)?.apellido_paterno +
              " " +
              filterTrabajador.at(-1)?.apellido_materno
            : "";

        setSucursal((value) => ({ ...value, encargado: nombre }));
      }
    }
  }, [sucursal.dni, dataToEdit]);

  const closeModal = () => {
    setModal2(false);
    setDataToEdit(null);
    form.setFieldsValue({});
    setCargando(false);
  };

  const handleSubmit = async (e) => {
    let route = "finanzas";
    if (dataToEdit === null) {
      setCargando(true);
      const create = await createData(sucursal, route);
      if (create) {
        notificacion(create.status, create.msg);
        getSaldo();
        closeModal();
        setCargando(false);
      }
    } else {
      setCargando(true);
      const prueba = await fetch(
        `${process.env.REACT_APP_BASE}/finanzas/${id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sucursal),
        }
      );
      const content = await prueba.json();
      if (content) {
        notificacion(content.status, content.msg);
        getSaldo();
        closeModal();
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
      setSucursal((values) => {
        return { ...values, [name]: value };
      });
    } else {
      form.setFieldsValue({
        [text]: e,
      });
      setSucursal((values) => {
        return { ...values, [text]: e };
      });
    }
  };

  useEffect(() => {
    if (sucursal.cantidad !== "" && sucursal.monto !== "") {
      const prueba = parseFloat(sucursal.monto) / parseFloat(sucursal.cantidad);

      setSucursal((value) => ({ ...value, precio: prueba }));
    }
  }, [sucursal.cantidad, sucursal.monto]);

  const formData = modalRegistrarMovimiento(
    sucursal,
    handleData,
    area,
    proveedor,
    data,
    unidad,
    id,
    categoria
  );

  return (
    <MainModal
      className={"modal-movimiento"}
      title={dataToEdit ? "Editar movimiento" : "Registrar movimiento"}
      open={modal2}
      width={700}
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
            className="item"
            key={i}
            name={item.name}
            rules={item.rules}
            style={{ marginBottom: "5px" }}
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

export default ModalRegistrarMovimiento;

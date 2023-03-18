import React from "react";
import { useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import MainModal from "../../modal/MainModal";
import { Checkbox, Input, Tabs, Button } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import "../styles/modal-permisos.css";
import { AiOutlineSave } from "react-icons/ai";
import { notificacion } from "../../../helpers/mensajes";

const ModalPermisos = ({ actualizarTabla }) => {
  const {
    modal1,
    setModal1,
    updateData,
    setDataToEdit,
    dataToEdit,
    getData,
    cargando,
    setCargando,
  } = useContext(CrudContext);
  const [datos, setDatos] = useState([
    {
      administracion: "",
      administracion_campamento: "",
      administracion_rol: "",
      administracion_usuario: "",
      finanzas: "",
      finanzas_ingreso: "",
      finanzas_proveedor: "",
      finanzas_sucursal: "",
      logistica: "",
      logistica_almacen: "",
      logistica_aprobacion: "",
      logistica_categoria: "",
      logistica_estadistica: "",
      logistica_inventario: "",
      logistica_requerimiento: "",
      logistica_transferencia: "",
      personal: "",
      personal_empresa: "",
      personal_grupal: "",
      personal_socio: "",
      personal_trabajador: "",
      planillas: "",
      planillas_asistencia: "",
      planillas_control: "",
      personal_contrato: "",
      personal_evaluacion: "",
    },
  ]);

  const getPermisos = async () => {
    const response = await getData(`usuario/permiso/${dataToEdit?.id}`);
    setDatos(response.data[0]);
  };

  useEffect(() => {
    getPermisos();
  }, [dataToEdit]);

  const closeModal = () => {
    setModal1(false);
    setDataToEdit(null);
  };
  const onChange = (e) => {
    if (e.target) {
      const { name, checked } = e.target;
      setDatos((values) => {
        return { ...values, [name]: checked };
      });
    }
  };

  const handleSubmit = async () => {
    setCargando(true);
    const route = "usuario/permisos";
    const response = await updateData(datos, dataToEdit.id, route);
    if (response) {
      notificacion(response.status, response.msg);
      getPermisos();
      closeModal();
      setCargando(false);
    }
  };

  const items = [
    {
      key: "1",
      label: `Administración`,
      children: (
        <div className="check-container">
          <Checkbox
            checked={datos?.administracion}
            name="administracion"
            onChange={onChange}
          >
            Menu administración
          </Checkbox>
          <Checkbox
            checked={datos?.administracion_usuario}
            name="administracion_usuario"
            onChange={onChange}
          >
            Usuarios
          </Checkbox>
          <Checkbox
            checked={datos?.administracion_rol}
            name="administracion_rol"
            onChange={onChange}
          >
            Roles
          </Checkbox>
          <Checkbox
            checked={datos?.administracion_campamento}
            name="administracion_campamento"
            onChange={onChange}
          >
            Campamentos
          </Checkbox>
        </div>
      ),
    },
    {
      key: "2",
      label: `Personal`,
      children: (
        <div className="check-container">
          <Checkbox
            checked={datos?.personal}
            name="personal"
            onChange={onChange}
          >
            Menu personal
          </Checkbox>
          <Checkbox
            checked={datos?.personal_trabajador}
            name="personal_trabajador"
            onChange={onChange}
          >
            Trabajadores
          </Checkbox>
          <Checkbox
            checked={datos?.personal_grupal}
            name="personal_grupal"
            onChange={onChange}
          >
            Grupales
          </Checkbox>
          <Checkbox
            checked={datos?.personal_empresa}
            name="personal_empresa"
            onChange={onChange}
          >
            Empresa
          </Checkbox>
          <Checkbox
            checked={datos?.personal_socio}
            name="personal_socio"
            onChange={onChange}
          >
            Socios
          </Checkbox>
          <Checkbox
            checked={datos?.personal_contrato}
            name="personal_contrato"
            onChange={onChange}
          >
            Trabajador contrato
          </Checkbox>
          <Checkbox
            checked={datos?.personal_evaluacion}
            name="personal_evaluacion"
            onChange={onChange}
          >
            Trabajador evaluación
          </Checkbox>
        </div>
      ),
    },
    {
      key: "3",
      label: `Planillas`,
      children: (
        <div className="check-container">
          <Checkbox
            checked={datos?.planillas}
            name="planillas"
            onChange={onChange}
          >
            Menu planillas
          </Checkbox>
          <Checkbox
            checked={datos?.planillas_asistencia}
            name="planillas_asistencia"
            onChange={onChange}
          >
            Lista de asistencia
          </Checkbox>
          <Checkbox
            checked={datos?.planillas_control}
            name="planillas_control"
            onChange={onChange}
          >
            Planillas
          </Checkbox>
        </div>
      ),
    },
    {
      key: "4",
      label: `Logística`,
      children: (
        <div className="check-container">
          <Checkbox
            checked={datos?.logistica}
            name="logistica"
            onChange={onChange}
          >
            Menu logistica
          </Checkbox>
          <Checkbox
            checked={datos?.logistica_inventario}
            name="logistica_inventario"
            onChange={onChange}
          >
            Inventario
          </Checkbox>
          <Checkbox
            checked={datos?.logistica_almacen}
            name="logistica_almacen"
            onChange={onChange}
          >
            Almacenes
          </Checkbox>
          <Checkbox
            checked={datos?.logistica_requerimiento}
            name="logistica_requerimiento"
            onChange={onChange}
          >
            Requerimientos
          </Checkbox>
          <Checkbox
            checked={datos?.logistica_aprobacion}
            name="logistica_aprobacion"
            onChange={onChange}
          >
            Aprobaciones
          </Checkbox>
          <Checkbox
            checked={datos?.logistica_transferencia}
            name="logistica_transferencia"
            onChange={onChange}
          >
            Transferencia
          </Checkbox>
          <Checkbox
            checked={datos?.logistica_categoria}
            name="logistica_categoria"
            onChange={onChange}
          >
            Categorías
          </Checkbox>
          <Checkbox
            checked={datos?.logistica_estadistica}
            name="logistica_estadistica"
            onChange={onChange}
          >
            Estadísticas
          </Checkbox>
        </div>
      ),
    },
    {
      key: "5",
      label: `Finanzas`,
      children: (
        <div className="check-container">
          <Checkbox
            checked={datos?.finanzas}
            name="finanzas"
            onChange={onChange}
          >
            Menu finanzas
          </Checkbox>
          <Checkbox
            checked={datos?.finanzas_ingreso}
            name="finanzas_ingreso"
            onChange={onChange}
          >
            Ingresos/Egresos
          </Checkbox>
          <Checkbox
            checked={datos?.finanzas_proveedor}
            name="finanzas_proveedor"
            onChange={onChange}
          >
            Proveedores
          </Checkbox>
          <Checkbox
            checked={datos?.finanzas_sucursal}
            name="finanzas_sucursal"
            onChange={onChange}
          >
            Sucursales
          </Checkbox>
        </div>
      ),
    },
  ];

  return (
    <MainModal
      className={"modal-permisos"}
      title="Modificar permisos"
      open={modal1}
      width={800}
      closeModal={closeModal}
    >
      <section className="modal-body">
        <div className="header">
          <Input
            disabled
            value={dataToEdit?.nombre}
            style={{ width: "200px" }}
          />
        </div>

        <Tabs
          className="tabs"
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          centered
        />
      </section>
      <div className="button-container">
        <Button
          onClick={handleSubmit}
          icon={<AiOutlineSave />}
          loading={cargando ? true : false}
        >
          Guardar
        </Button>
      </div>
    </MainModal>
  );
};

export default ModalPermisos;

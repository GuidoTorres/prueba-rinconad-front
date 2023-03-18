import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AiOutlineForm } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { trabajadorEvaluacionValues } from "../../../data/initalValues";
import MainModal from "../../modal/MainModal";
import { Button, Input, Select } from "antd";
import { notificacion } from "../../../helpers/mensajes";
import "../styles/modalRegistroEvaluacion.css";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";

const ModalRegistroEvaluacion = ({
  actualizarTabla,
  selected,
  actualizarTrabajador,
}) => {
  const route = "evaluacion";
  const route1 = "cargo";

  const evaluacionValues = trabajadorEvaluacionValues(selected);
  const {
    createData,
    updateData,
    getData,
    setDataToEdit,
    dataToEdit,
    modal3,
    setModal3,
    cargando,
    setCargando,
  } = useContext(CrudContext);
  const [evaluacion, setEvaluacion] = useState(evaluacionValues);
  const [cargo, setCargo] = useState([]);
  const [socio, setSocio] = useState([]);
  const [area, setArea] = useState([]);
  const [campamento, setCampamento] = useState([]);
  const getCargo = async () => {
    const route2 = "socio";
    const response = await getData(route1);
    const response2 = await getData(route2);
    const response3 = await getData("area");
    const response4 = await getData("campamento");

    setCargo(response.data);
    setSocio(response2.data);
    setArea(response3.data);
    setCampamento(response4.data);
  };
  useEffect(() => {
    if (dataToEdit) {
      setEvaluacion(dataToEdit);
    } else {
      setEvaluacion(evaluacionValues);
    }
  }, [dataToEdit]);
  useEffect(() => {
    getCargo();
  }, []);

  useEffect(() => {
    if (dataToEdit === null) {
      const cooperativa = socio.filter(
        (item) => item?.nombre === evaluacion.recomendado_por
      );

      setEvaluacion((value) => ({
        ...value,
        cooperativa: cooperativa?.at(-1)?.cooperativa,
      }));
    }
  }, [evaluacion.recomendado_por, dataToEdit]);

  const handleData = (e, text) => {
    if (!text && e.target) {
      const { name, value } = e.target;

      setEvaluacion((values) => {
        return { ...values, [name]: value };
      });
    } else {
      setEvaluacion((values) => {
        return { ...values, [text]: e };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dataToEdit === null) {
      setCargando(true);
      const response = await createData(evaluacion, route);

      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarTabla();
        actualizarTrabajador();
        setModal3(false);
        setCargando(false);
      }
    }

    if (dataToEdit) {
      setCargando(true);
      const response = await updateData(
        evaluacion,
        dataToEdit.evaluacion_id,
        route
      );

      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarTabla();
        actualizarTrabajador();
        setCargando(false);
      }
    }
  };

  const closeModal = () => {
    setModal3(false);
    setDataToEdit(null);
    setEvaluacion(evaluacionValues);
    setCargando(false);
  };

  return (
    <MainModal
      className={"modal-registrar-contrato"}
      title={dataToEdit ? "Editar evaluación" : "Registrar evaluación"}
      open={modal3}
      width={700}
      closeModal={closeModal}
    >
      <form className="modal-body" onSubmit={handleSubmit}>
        <fieldset className="cabecera">
          <div>
            <label> Fecha de evaluación</label>
            <Input
              type="date"
              value={evaluacion?.fecha_evaluacion?.split("T")[0]}
              placeholder="Fecha de evaluación"
              name="fecha_evaluacion"
              style={{
                width: "300px",
              }}
              onChange={handleData}
              size="small"
            />
          </div>
          <div>
            <label htmlFor="">Cargo al que postula</label>
            <Select
              value={evaluacion.puesto ? parseInt(evaluacion.puesto) : ""}
              name="puesto"
              size="small"
              style={{
                width: "300px",
              }}
              onChange={(e) => handleData(e, "puesto")}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={cargo.map((item) => {
                return {
                  value: item.id,
                  label: item.nombre,
                };
              })}
            />
          </div>
          <div>
            <label htmlFor="">Área</label>
            <Select
              value={evaluacion.area}
              name="area"
              size="small"
              style={{
                width: "300px",
              }}
              onChange={(e) => handleData(e, "area")}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={area.map((item, i) => {
                return {
                  value: item.nombre + i,
                  label: item.nombre,
                };
              })}
            />
          </div>
          <div>
            <label htmlFor="">Campamento</label>
            <Select
              value={evaluacion.campamento}
              name="campamento"
              size="small"
              style={{
                width: "300px",
              }}
              onChange={(e) => handleData(e, "campamento")}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={campamento?.map((item) => {
                return {
                  value: item.nombre,
                  label: item.nombre,
                };
              })}
            />
          </div>
        </fieldset>
        <fieldset className="cooperativa">
          <legend>
            <strong>Cooperativa</strong>
          </legend>
          <div>
            <label>Recomendado por</label>

            <Select
              value={evaluacion?.recomendado_por}
              name="recomendado_por"
              size="small"
              style={{
                width: "200px",
              }}
              onChange={(e) => handleData(e, "recomendado_por")}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={socio.map((item) => {
                return {
                  value: item.nombre,
                  label: item.nombre,
                };
              })}
            />
          </div>
          <div>
            <label>Cooperativa</label>
            <Input
              disabled
              type="text"
              name="cooperativa"
              value={evaluacion?.cooperativa}
              size="small"
            />
          </div>

          <div>
            <label>Condición cooperativa</label>
            <Select
              value={evaluacion?.condicion_cooperativa}
              name="condicion_cooperativa"
              style={{ width: "200px" }}
              size="small"
              onChange={(e) => handleData(e, "condicion_cooperativa")}
              options={[
                {
                  label: "Hijo",
                  value: "Hijo",
                },
                {
                  label: "Sobrino",
                  value: "Sobrino",
                },
                {
                  label: "Primo",
                  value: "Primo",
                },
                {
                  label: "Tio",
                  value: "Tio",
                },
                {
                  label: "Compadre",
                  value: "Compadre",
                },
                {
                  label: "Compañero",
                  value: "Compañero",
                },
                {
                  label: "Amigo",
                  value: "Amigo",
                },
                {
                  label: "Nuera",
                  value: "Nuera",
                },
                {
                  label: "Conocido",
                  value: "Conocido",
                },
                {
                  label: "Recomendado",
                  value: "Recomendado",
                },
                {
                  label: "Titular",
                  value: "Titular",
                },
                {
                  label: "Externo",
                  value: "Externo",
                },
              ]}
            />
          </div>
        </fieldset>
        <section className="prueba">
          <fieldset className="fiscalizador">
            <legend>
              <strong>Fiscalizador</strong>
            </legend>
            <div className="fiscalizador">
              <label htmlFor=""> Fiscalizador a cargo </label>
              <Select
                value={evaluacion?.fiscalizador}
                name="fiscalizador"
                onChange={(e) => handleData(e, "fiscalizador")}
                size="small"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={socio.slice(1)?.map((item) => {
                  return {
                    label: item.nombre,
                    value: item.nombre,
                  };
                })}
              />
            </div>
            <div className="autoriza">
              <div className="">
                <label htmlFor=""> Autoriza:</label>
              </div>
              <div className="radio">
                <label htmlFor=""> Si</label>
                <input
                  type="radio"
                  name="fiscalizador_aprobado"
                  value="si"
                  checked={evaluacion?.fiscalizador_aprobado === "si"}
                  onChange={handleData}
                />

                <label htmlFor=""> No</label>
                <input
                  type="radio"
                  name="fiscalizador_aprobado"
                  value="no"
                  checked={evaluacion?.fiscalizador_aprobado !== "si"}
                  onChange={handleData}
                />
              </div>
            </div>
          </fieldset>
          <fieldset className="control">
            <legend>
              <strong>Control</strong>
            </legend>

            <div>
              <div>
                <label htmlFor="">
                  <strong>Estado:</strong>{" "}
                  {selected?.contrato?.map((item) =>
                    item?.estado !== false ? "Suspendido" : "Normal"
                  )}
                </label>
              </div>
              <label htmlFor="">
                {" "}
                <strong>Evaluación laboral:</strong> {selected?.nota}
              </label>
            </div>
            <div className="autoriza">
              <label htmlFor="">
                {" "}
                <strong>Autoriza:</strong>
              </label>
              <div>
                <label htmlFor=""> Si</label>
                <input
                  type="radio"
                  name="control"
                  value="si"
                  checked={evaluacion.control === "si"}
                  onChange={handleData}
                />

                <label htmlFor=""> No</label>
                <input
                  type="radio"
                  name="control"
                  value="no"
                  checked={evaluacion.control !== "si"}
                  onChange={handleData}
                />
              </div>
            </div>
            <div>
              <label htmlFor="">
                <strong>Observaciones:</strong>
              </label>
              <TextArea
                name="control_observacion"
                value={evaluacion?.control_observacion}
                onChange={handleData}
                rows={1}
              />
            </div>
          </fieldset>
        </section>

        <section className="prueba2">
          <fieldset className="topico">
            <legend>
              <strong>Topico</strong>
            </legend>

            <div>
              <label htmlFor="">Presión arterial</label>
              <Input
                type="number"
                value={evaluacion.presion_arterial}
                name="presion_arterial"
                onChange={handleData}
                size="small"
              />
            </div>
            <div>
              <label htmlFor="">Temperatura</label>
              <Input
                type="number"
                value={evaluacion.temperatura}
                name="temperatura"
                onChange={handleData}
                size="small"
              />
            </div>
            <div>
              <label htmlFor="">Saturación de oxígeno</label>
              <Input
                type="number"
                value={evaluacion.saturacion}
                name="saturacion"
                onChange={handleData}
                size="small"
              />
            </div>
            <div>
              <label htmlFor="">IMC</label>
              <Input
                type="number"
                value={evaluacion.imc}
                name="imc"
                onChange={handleData}
                size="small"
              />
            </div>
            <div>
              <label htmlFor="">Pulso(pm)</label>
              <Input
                type="number"
                value={evaluacion.pulso}
                name="pulso"
                onChange={handleData}
                size="small"
              />
            </div>
            <div>
              <label htmlFor="">Diabetes</label>
              {/* <select
                value={evaluacion.diabetes}
                name="diabetes"
                onChange={(e) => handleData(e, "diabetes")}
              >
                <option value="Si">Si</option>
                <option value="No">No</option>

              </select> */}
              <div className="autoriza">
                <div>
                  <label htmlFor=""> Si</label>
                  <input
                    type="radio"
                    name="diabetes"
                    value="Si"
                    checked={evaluacion.diabetes === "Si"}
                    onChange={handleData}
                  />
                </div>
                <div>
                  <label htmlFor=""> No</label>
                  <input
                    type="radio"
                    name="diabetes"
                    value="No"
                    checked={evaluacion.diabetes !== "Si"}
                    onChange={handleData}
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="">Observaciones</label>
              <TextArea
                name="topico_observacion"
                value={evaluacion?.topico_observacion}
                onChange={handleData}
                rows={1}
              />
            </div>
            <div className="autoriza">
              <label htmlFor=""> Autoriza:</label>
              <div>
                <label htmlFor=""> Si</label>
                <input
                  type="radio"
                  name="topico"
                  value="si"
                  checked={evaluacion.topico === "si"}
                  onChange={handleData}
                />
              </div>
              <div>
                <label htmlFor=""> No</label>
                <input
                  type="radio"
                  name="topico"
                  value="no"
                  checked={evaluacion.topico !== "si"}
                  onChange={handleData}
                />
              </div>
            </div>
          </fieldset>
          <fieldset className="seguridad">
            <legend>
              <strong>Seguridad</strong>
            </legend>

            <div>
              <label>Capacitación SSO: </label>
              <Input
                value={evaluacion?.capacitacion_sso}
                name="capacitacion_sso"
                onChange={handleData}
                type="number"
                size="small"
              />
            </div>
            <section>
              <div>
                <label htmlFor="">Observaciones:</label>
                <TextArea
                  name="seguridad_observacion"
                  value={evaluacion?.seguridad_observacion}
                  onChange={handleData}
                  rows={1}
                />
              </div>
              <div>
                <label htmlFor=""> Autoriza:</label>
                <div>
                  <label htmlFor=""> Si</label>
                  <input
                    type="radio"
                    name="seguridad"
                    value="si"
                    checked={evaluacion?.seguridad === "si"}
                    onChange={handleData}
                  />

                  <label htmlFor=""> No</label>
                  <input
                    type="radio"
                    name="seguridad"
                    value="no"
                    checked={evaluacion?.seguridad !== "si"}
                    onChange={handleData}
                  />
                </div>
              </div>
            </section>
          </fieldset>
          <fieldset className="ambiente">
            <legend>
              <strong>Medio Ambiente</strong>
            </legend>

            <div>
              <label htmlFor="">Capacitación GEMA: </label>
              <Input
                type="number"
                value={evaluacion?.capacitacion_gema}
                name="capacitacion_gema"
                onChange={handleData}
              />
            </div>
            <section>
              <div>
                <label htmlFor="">Observaciones</label>
                <TextArea
                  name="medio_ambiente_observacion"
                  value={evaluacion?.medio_ambiente_observacion}
                  onChange={handleData}
                  rows={1}
                />
              </div>
              <div className="titulo">
                <label htmlFor=""> Autoriza</label>
                <div>
                  <label htmlFor=""> Si</label>
                  <input
                    type="radio"
                    name="medio_ambiente"
                    value="si"
                    checked={evaluacion?.medio_ambiente === "si"}
                    onChange={handleData}
                  />

                  <label htmlFor=""> No</label>
                  <input
                    type="radio"
                    name="medio_ambiente"
                    value="no"
                    checked={evaluacion?.medio_ambiente !== "si"}
                    onChange={handleData}
                  />
                </div>
              </div>
            </section>
          </fieldset>
        </section>
        <fieldset className="recursos">
          <legend>
            <strong>Recursos Humanos</strong>
          </legend>
          <div>
            <label htmlFor="">Observaciones: </label>
            <TextArea
              name="recursos_humanos_observacion"
              value={evaluacion?.recursos_humanos_observacion}
              onChange={handleData}
              rows={1}
            />
          </div>
          <div>
            <label htmlFor=""> Autoriza:</label>
            <div>
              <label htmlFor=""> Si</label>
              <input
                type="radio"
                name="recursos_humanos"
                value="si"
                checked={evaluacion?.recursos_humanos === "si"}
                onChange={handleData}
              />
            </div>
            <div>
              <label htmlFor=""> No</label>
              <input
                type="radio"
                name="recursos_humanos"
                value="no"
                checked={evaluacion?.recursos_humanos !== "si"}
                onChange={handleData}
              />
            </div>
          </div>
        </fieldset>

        <div className="button-container">
          {dataToEdit ? (
            <Button
              icon={<AiOutlineForm />}
              onClick={handleSubmit}
              loading={cargando ? true : false}
            >
              Editar
            </Button>
          ) : (
            <Button
              icon={<AiOutlineForm />}
              onClick={handleSubmit}
              loading={cargando ? true : false}
            >
              Registrar
            </Button>
          )}
        </div>
      </form>
    </MainModal>
  );
};

export default ModalRegistroEvaluacion;

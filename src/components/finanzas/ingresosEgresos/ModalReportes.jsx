import React from "react";
import { Line } from "react-chartjs-2";
import { useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { useEffect } from "react";
import { useState } from "react";
import MainModal from "../../modal/MainModal";
import { Button, Input, Select } from "antd";
import { Empty } from "antd";
import "../styles/modalReportes.css";

const ModalReportes = ({ id }) => {
  const { getData, data2, setData2, createData, modal, setModal } =
    useContext(CrudContext);
  const initialValues = {
    area: "",
    fecha_inicio: "",
    fecha_fin: "",
  };
  const [reporte, setReporte] = useState(initialValues);
  const [dataReporte, setDataReporte] = useState();

  const closeModal = () => {
    setModal(false);
  };

  const getArea = async () => {
    const response = await getData("area");
    setData2(response.data);
  };

  useEffect(() => {
    getArea();
  }, []);

  const data = {
    labels: dataReporte?.labels,
    datasets: [dataReporte?.ingresos, dataReporte?.egresos],
  };

  const handleChange = (e, text) => {
    if (!text && e.target) {
      const { name, value } = e.target;
      setReporte((values) => {
        return { ...values, [name]: value };
      });
    } else {
      setReporte((values) => {
        return { ...values, [text]: e };
      });
    }
  };
  console.log(reporte);
  const postReporte = async (e) => {
    const response = await createData(reporte, `finanzas/reporte/${id}`);
    setDataReporte(response.data);
  };

  return (
    <MainModal
      className={"modal-reporte"}
      title={"Estadísticas"}
      open={modal}
      width={800}
      closeModal={closeModal}
    >
      <section className="inputs">
        <div>
          <label htmlFor="">Área</label>

          <Select
            placeholder="Área"
            style={{
              width: "100%",
            }}
            name="area"
            value={reporte.area}
            onChange={(e) => handleChange(e, "area")}
          >
            {data2.map((item) => (
              <Select.Option value={item.nombre}>{item.nombre}</Select.Option>
            ))}
          </Select>
        </div>
        <div>
          <label htmlFor="">Fecha de inicio</label>
          <Input type="date" name="fecha_inicio" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="">Fecha de fin</label>
          <Input type="date" name="fecha_fin" onChange={handleChange} />
        </div>
        <div className="button-container">
          <Button onClick={postReporte}>Generar</Button>
        </div>
      </section>
      <section className="grafico">
        {dataReporte?.labels?.length > 0 ? (
          <Line datasetIdKey="id" data={data} />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No hay datos para mostrar.</span>}
          />
        )}
      </section>
    </MainModal>
  );
};

export default ModalReportes;

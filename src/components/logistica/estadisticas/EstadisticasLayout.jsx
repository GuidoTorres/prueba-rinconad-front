import { DatePicker } from "antd";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";

import { CrudContext } from "../../../context/CrudContext";
import Header from "../../header/Header";
import "../styles/estadisticasLayout.css";

import "chart.js/auto";
import { Bar } from "react-chartjs-2";

const EstadisticasLayout = () => {
  const [fechas, setFechas] = useState({
    fecha_inicio: "",
    fecha_fin: "",
  });
  const [datos, setDatos] = useState([]);

  const { createData } = useContext(CrudContext);

  const data = {
    labels: datos?.map((item) => item.area),
    datasets: [
      {
        label: "Gastos por área",
        data: datos?.map((item) => item.costo),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
        borderRadius: 15,
        fill: false,
      },
    ],
  };

  const handleData = (e, text) => {
    setFechas((values) => {
      return { ...values, [text]: e };
    });
  };

  const getEstadisticas = async () => {
    if (fechas.fecha_inicio !== "" && fechas.fecha_fin !== "") {
      const route = "entrada/estadistica";

      const response = await createData(fechas, route);

      if (response) {
        setDatos(response.data);
      }
    }
  };

  const options = {
    responsive: true,
  };

  useEffect(() => {
    getEstadisticas();
  }, [fechas]);

  return (
    <>
      <Header text={"Estadísticas"} user={"Usuario"} ruta={"/logistica"} />
      <div className="estadisticas-container">
        <div className="estadisticas-layout">
          <div>
            <label htmlFor="">Fecha de inicio:</label>
            <DatePicker
              style={{
                width: "100%",
              }}
              name="fecha_inicio"
              placeholder="Fecha de inicio"
              onChange={(e) => handleData(e, "fecha_inicio")}
            />
          </div>
          <div>
            <label htmlFor="">Fecha de fin:</label>
            <DatePicker
              style={{
                width: "100%",
              }}
              name="fecha_fin"
              placeholder="Fecha de fin"
              onChange={(e) => handleData(e, "fecha_fin")}
            />
          </div>
        </div>

        <div className="grafico-container">
          <Bar
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              
              layout: {
                padding: {
                  top: 5,
                  left: 25,
                  right: 25,
                  bottom: 15,
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default EstadisticasLayout;

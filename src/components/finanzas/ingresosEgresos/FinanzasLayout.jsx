import React, { useState, useEffect, useContext } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { finanzas } from "../../../data/dataTable";
import useSearch from "../../../hooks/useSearch";
import Header from "../../header/Header";
import Tabla from "../../tabla/Tabla";
import Buscador from "../Buscador";
import ModalDescarga from "./ModalDescarga";
import ModalReportes from "./ModalReportes";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Select, Statistic } from "antd";
import { notificacion } from "../../../helpers/mensajes";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

import ModalRegistrarMovimiento from "./ModalRegistrarMovimiento";
import Cargando from "../../cargando/Cargando";
import { Empty } from "antd";

import "../styles/finanzasLayout.css";

const Finanzas = () => {
  const {
    getData,
    setData,
    data,
    getDataById,
    createData,
    dataToEdit,
    setDataToEdit,
    updateData,
    deleteData,
    setModal,
    modal,
    setModal1,
    modal1,
    modal2,
    setModal2,
    cargando,
    setCargando,
  } = useContext(CrudContext);
  const [saldo, setSaldo] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [reportes, setReportes] = useState(false);
  const [id, setId] = useState("");
  const [saldoMensual, setSaldoMensual] = useState([]);
  const [dataSaldo, setDataSaldo] = useState([]);

  const getSucursal = async () => {
    const route = "sucursal";
    const response = await getData(route);

    if (response) {
      setData(response.data);
    }
  };
  useEffect(() => {
    getSucursal();
  }, []);

  const getSaldo = async () => {
    const route5 = "saldo";
    const route6 = "finanzas/sucursal";

    if (id !== "") {
      const saldoData = await getDataById(route5, id);
      const tablaData = await getDataById(route6, id);
      const saldoMen = await getDataById("finanzas/saldo", id);

      setSaldo(saldoData.data);
      setHistorial(tablaData.data);
      setSaldoMensual(saldoMen.data);
    }
  };

  const formatSaldoMensual = () => {
    //sumar los egresos si son de la misma fecha
    const egresos = saldoMensual
      ?.filter((item) => item.movimiento === "Egreso")
      .reduce((acc, curr) => {
        const findData = acc.find((ele) => ele.fecha === curr.fecha);
        if (findData) {
          findData.monto =
            (parseFloat(findData.monto) + parseFloat(curr.monto)) * -1;
        } else {
          acc.push({
            area: curr.area,
            egresos: curr.egresos,
            fecha: curr.fecha,
            monto: parseFloat(curr.monto) * -1,
            movimiento: curr.movimiento,
          });
        }

        return acc;
      }, []);



    const ingresos = saldoMensual
      ?.filter((item) => item.movimiento === "Ingreso")
      .reduce((acc, curr) => {
        const findData = acc.find((ele) => ele.fecha === curr.fecha);

        if (findData) {
          findData.monto = parseFloat(findData.monto) + parseFloat(curr.monto);
        } else {
          acc.push(curr);
        }

        return acc;
      }, []);

    const concat = ingresos?.concat(egresos);
    const sort = concat?.sort((a, b) => {
      if (a.movimiento > b.movimiento) {
        return -1;
      }
    });

    //caluclar el saldo por mes
    const prueba2 = sort?.reduce((acc, curr) => {
      const ingresos = acc.find((ele) => ele.fecha === curr.fecha);

      if (ingresos) {
        ingresos.monto = parseFloat(ingresos.monto) + parseFloat(curr.monto);
      } else {
        acc.push(curr);
      }

      return acc;
    }, []);
    const sortFecha = prueba2?.sort((a, b) => a.fecha - b.fecha);

    const prueba4 = sortFecha?.map((item) => {
      return {
        total: item.monto,
        mes:
          item.fecha === 1
            ? "ene"
            : item.fecha === 2
            ? "feb"
            : item.fecha === 3
            ? "mar"
            : item.fecha === 4
            ? "abr"
            : item.fecha === 5
            ? "may"
            : item.fecha === 6
            ? "jun"
            : item.fecha === 7
            ? "jul"
            : item.fecha === 8
            ? "ago"
            : item.fecha === 9
            ? "sep"
            : item.fecha === 10
            ? "oct"
            : item.fecha === 11
            ? "nov"
            : item.fecha === 12
            ? "dic"
            : "",
      };
    });

    setDataSaldo(prueba4);
  };

  useEffect(() => {
    formatSaldoMensual();
  }, [saldoMensual]);

  useEffect(() => {
    getSaldo();
  }, [id]);

  const handleEdit = (e) => {
    setDataToEdit(e);
    setModal2(true);
  };

  const handleDelete = async (e) => {
    let route = "finanzas";
    const destroy = await deleteData(route, e);
    if (destroy) {
      notificacion(destroy.status, destroy.msg);
      getSaldo();
    }
  };

  const datas = {
    labels: dataSaldo?.map((item) => item?.mes),

    datasets: [
      {
        label: "Saldo mensual",
        // label: 'My First Dataset',
        data: dataSaldo?.map((item) => item?.total),
        // backgroundColor: ["#D1C126"],
        borderColor: ["#079434"],
        borderWidth: 1,
        borderRadius: 15,
        fill: false,
      },
    ],
  };


  const columns = finanzas(handleEdit, handleDelete);
  const { result } = useSearch(historial);

  return (
    <>
      <Header text={"Finanzas"} user={"Usuario"} ruta={"/finanzas"} />

      <section className="finanzas-layout">
        <section className="header">
          <div>
            <Select
              placeholder="Seleccione una sucursal"
              name="sucursal_id"
              onChange={(e) => setId(e)}
              style={{ width: "250px" }}
              options={data.map((item, i) => {
                return {
                  label: item.nombre,
                  value: item.id,
                };
              })}
            />
          </div>
        </section>

        {id !== "" ? (
          <>
            <section className="saldo">
              <Card bordered={true}>
                <Statistic
                  title={<h1>Saldo inicial</h1>}
                  value={parseFloat(saldo?.at(-1)?.saldo_inicial).toFixed(2)}
                  valueStyle={{
                    color: "black",
                    fontSize: "19px",
                  }}
                  prefix={"S/"}
                />
              </Card>
              <Card bordered={true}>
                <Statistic
                  title={<h1>Ingresos</h1>}
                  value={parseFloat(saldo?.at(-1)?.ingresos).toFixed(2)}
                  valueStyle={{
                    color: "#3f8600",
                    fontSize: "19px",
                  }}
                  prefix={
                    <>
                      <ArrowUpOutlined /> S/
                    </>
                  }
                  // suffix="%"
                />
              </Card>
              <Card bordered={true}>
                <Statistic
                  title={<h1>Egresos</h1>}
                  value={parseFloat(saldo?.at(-1)?.egresos).toFixed(2)}
                  valueStyle={{
                    color: "#cf1322",
                    fontSize: "19px",
                  }}
                  prefix={
                    <>
                      <ArrowDownOutlined /> S/
                    </>
                  }

                  // suffix="%"
                />
              </Card>
              <Card bordered={true}>
                <Statistic
                  title={<h1>Saldo final</h1>}
                  value={parseFloat(saldo?.at(-1)?.saldo_final).toFixed(2)}
                  valueStyle={{
                    color: "black",
                    fontSize: "19px",
                  }}
                  prefix={"S/"}
                />
              </Card>
            </section>
            <section className="grafico">
              {data?.length > 0 ? <Bar data={datas} /> : ""}
            </section>
            <section className="tabla">
              <Buscador abrirModal={setModal} abrirReporte={setModal1} />
              <br />

              {historial?.length > 0 ? (
                <Tabla columns={columns} table={result} />
              ) : (
                <div className="noData">
                  {cargando ? (
                    <Cargando />
                  ) : (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={<span>No hay registros para mostrar.</span>}
                    />
                  )}
                </div>
              )}
            </section>{" "}
          </>
        ) : (
          ""
        )}
      </section>

      {modal && <ModalReportes id={id} />}
      {modal1 && <ModalDescarga id={id} />}
      {modal2 && <ModalRegistrarMovimiento id={id} getSaldo={getSaldo} />}
    </>
  );
};

export default Finanzas;

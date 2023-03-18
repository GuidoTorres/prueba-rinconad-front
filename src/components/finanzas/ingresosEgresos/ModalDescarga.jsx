import React from "react";
import { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { CrudContext } from "../../../context/CrudContext";
import MainModal from "../../modal/MainModal";
import { Button, Input } from "antd";
import "../styles/modalDescargar.css";

const ModalDescarga = ({ id }) => {
  const { getData, modal1, setModal1 } = useContext(CrudContext);
  const [fechas, setFechas] = useState({
    fecha_inicio: "",
    fecha_fin: "",
  });

  const closeModal = () => {
    setModal1(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let route = `${process.env.REACT_APP_BASE}/finanzas/excel`;

    if (id !== "") {
      const prueba = await axios.get(
        `${route}/${id}?fecha_inicio=${fechas.fecha_inicio}&fecha_fin=${fechas.fecha_fin}`,
        {
          responseType: "arraybuffer",
          headers: { "Content-Type": "blob" },
        }
      );

      if (prueba) {
        const url = URL.createObjectURL(new Blob([prueba.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `reporte del ${fechas.fecha_inicio} al ${fechas.fecha_fin}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
      }
    }
  };

  const handleData = (e) => {
    const { name, value } = e.target;

    setFechas((values) => {
      return { ...values, [name]: value };
    });
  };

  return (
    <MainModal
      className="modal-descargar"
      title={"Descargar reporte"}
      open={modal1}
      width={300}
      closeModal={closeModal}
    >
      <form className="modal-body">
        <div>
          <label>Fecha de inicio</label>
          <Input type="date" name="fecha_inicio" onChange={handleData}></Input>
        </div>
        <div>
          <label>Fecha de fin</label>
          <Input type="date" name="fecha_fin" onChange={handleData}></Input>
        </div>
        <div className="button-container">
          <Button onClick={handleSubmit}>Descargar</Button>
        </div>
      </form>
    </MainModal>
  );
};

export default ModalDescarga;

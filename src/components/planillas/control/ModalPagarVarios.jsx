import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { AiOutlineClose, AiFillEye } from "react-icons/ai";
import { CrudContext } from "../../../context/CrudContext";
import { PlanillaContext } from "../../../context/PlanillaContext";
import "../style/modalPagarVarios.css";
const ModalPagarVarios = ({ data, selected, actualizarTabla }) => {
  const { setPag, setPagarVarios, multiplesTeletrans, setMultiplesTeletrans } =
    useContext(PlanillaContext);

  const initial = {
    conductor: "",
    dni: "",
    telefono: "",
    placa: "",
    teletrans: "",
    lugar: "",
    contrato_id: multiplesTeletrans.map((item) => item.contrato_id),
  };
  const [initialValues, setInitialValues] = useState(initial);

  const { createData } = useContext(CrudContext);
  const [pagar, setPagar] = useState();
  const [pago2, setPago2] = useState([]);
  const closeModal = () => {
    setPagarVarios(false);
  };
  console.log(initialValues);
  const handleChange = (e, i) => {
    const { name, value } = e.target;
    setInitialValues((values) => {
      return { ...values, [name]: value };
    });
  };

  // useEffect(() => {
  //   initialValues.slice(0);
  // }, []);

  const handleSubmit = async (e) => {
    const route = "pago";
    const route2 = "pago/multiple";

    // e.preventDefault();
    // if (data.asociacion !== null) {
    //   constcreateData(initialValues, route2).then((res) => {
    //     if (res.status) {
    //       alertaExito(res.msg, res.status).then((res) => {
    //         closeModal();
    //         if (res.isConfirmed) {
    //           actualizarTabla();
    //         }
    //       });
    //     }
    //   });
    // } else {
    //   createData(initialValues, route).then((res) => {
    //     if (res.status) {
    //       alertaExito(res.msg, res.status).then((res) => {
    //         closeModal();
    //         if (res.isConfirmed) {
    //           // actualizarTabla();
    //         }
    //       });
    //     }
    //   });
    // }
  };
  return (
    <div className="modal-pago">
      <div className="overlay">
        <div className="modal-container">
          <section className="modal-header">
            Ficha de envio
            <AiOutlineClose onClick={closeModal} />
          </section>
          <section
            className="cabecera"
            style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
          >
            {multiplesTeletrans.map((item, i) => (
              <fieldset key={i} style={{ width: "31%", padding: "4px" }}>
                <div>
                  <label htmlFor="">
                    Nombre:{" "}
                    {item?.nombre +
                      " " +
                      item?.apellido_paterno +
                      " " +
                      item?.apellido_materno}
                  </label>
                </div>

                <div>
                  <div>
                    <label htmlFor="">Dni: {item?.dni}</label>
                  </div>
                  <div>
                    <label htmlFor="">Teléfono: {item?.telefono}</label>
                  </div>
                  <div>
                    <label htmlFor="">Teletrans: {item?.teletrans}</label>
                  </div>
                </div>
              </fieldset>
            ))}
          </section>

          <form className="form" onSubmit={handleSubmit}>
            <section className="body">
              <div className="input-container">
                <div>
                  <label htmlFor="">Conductor</label>
                  <input
                    name="conductor"
                    type="text"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div>
                  <label htmlFor="">Dni</label>
                  <input
                    name="dni"
                    type="number"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label htmlFor="">Teléfono</label>
                  <input
                    name="telefono"
                    type="number"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div>
                  <label htmlFor="">Placa</label>
                  <input
                    name="placa"
                    type="text"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label htmlFor="">Teletrans</label>
                  <input
                    name="teletrans"
                    type="number"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label htmlFor="">Lugar de Despacho</label>
                  <input
                    name="lugar"
                    type="text"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            </section>

            <div className="footer">
              <button>Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalPagarVarios;

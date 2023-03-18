import { createContext, useState } from "react";

export const PlanillaContext = createContext();

export const PlanillaProvider = ({ children }) => {
  const [planillaControl, setPlanillaControl] = useState(false);
  const [asistencia, setAsistencia] = useState(false);
  const [controlAsistencia, setControlAsistencia] = useState(false);
  const [campamentoAsistencia, setCampamentoAsistencia] = useState();
  const [validacionPagos, setValidacionPagos] = useState(false);
  const [validacionPagosAsociacion, setValidacionPagosAsociacion] =
    useState(false);

  const [fechaId, setFechaId] = useState();
  const [userData, setUserdata] = useState([]);
  const [pago, setPago] = useState(false);
  const [fechas, setFechas] = useState([]);
  const [verificacion, setVerificacion] = useState(false);
  const [juntarTeletrans, setJuntarTeletrans] = useState(false)
  const [pagarVarios, setPagarVarios]= useState(false)
  const [multiplesTeletrans, setMultiplesTeletrans] = useState([])

  const data = {
    planillaControl,
    setPlanillaControl,
    asistencia,
    setAsistencia,
    controlAsistencia,
    setControlAsistencia,
    campamentoAsistencia,
    setCampamentoAsistencia,
    validacionPagos,
    setValidacionPagos,
    fechaId,
    setFechaId,
    verificacion,
    setVerificacion,
    userData,
    setUserdata,
    pago,
    setPago,
    validacionPagosAsociacion,
    setValidacionPagosAsociacion,
    fechas, multiplesTeletrans, setMultiplesTeletrans,
    setFechas,juntarTeletrans, setJuntarTeletrans,pagarVarios, setPagarVarios
  };

  return (
    <PlanillaContext.Provider value={data}>{children}</PlanillaContext.Provider>
  );
};

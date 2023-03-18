export const usuarioValues = {
  nombre: "",
  usuario: "",
  contrasenia: "",
  estado: "",
};

export const rolValues = {
  nombre: "",
  // descripcion: ""
};

export const campamentoValues = {
  nombre: "",
  direccion: "",
};

export const trabajadorValues = () => {
  return {
    dni: "",
    codigo_trabajador: "",
    fecha_nacimiento: "",
    telefono: "",
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    email: "",
    estado_civil: "",
    genero: "",
    direccion: "",
    asociacion_id: null,
    eliminar: false,
  };
};

export const trabajadorEvaluacionValues = (selected) => {
  return {
    fecha_evaluacion: "",
    puesto: "",
    capacitacion_sso: "",
    capacitacion_gema: "",
    evaluacion_laboral: "",
    presion_arterial: "",
    temperatura: "",
    saturacion: "",
    imc: "",
    pulso: "",
    diabetes: "",
    antecedentes: "",
    emo: "",
    trabajador_id: selected.dni,
    aprobado: "",
    recomendado_por: "",
    cooperativa: "",
    condicion_cooperativa: "",
    fiscalizador: "",
    fiscalizador_aprobado: "no",
    control: "no",
    topico: "no",
    seguridad: "no",
    medio_ambiente: "no",
    recursos_humanos: "no",
    topico_observacion: "",
    control_observacion: "",
    seguridad_observacion: "",
    medio_ambiente_observacion: "",
    recursos_humanos_observacion: "",
    finalizado: false,
    area: "",
    campamento: "",
  };
};

export const empresaContratoValues = (data) => {
  return {
    fecha_inicio: "",
    codigo_contrato: "",
    tipo_contrato: "",
    recomendado_por: "",
    cooperativa: "",
    condicion_cooperativa: "",
    periodo_trabajo: "",
    fecha_fin: "",
    gerencia: "",
    area: "",
    jefe_directo: "",
    base: "",
    termino_contrato: "",
    campamento_id: "",
    nota_contrato: "",
    puesto: "",
    evaluacion_id: data?.evaluacion_id,
    estado: false,
  };
};

export const valuesContrato = (data, ids) => {
  return {
    fecha_inicio: "",
    codigo_contrato: "",
    tipo_contrato: "",
    recomendado_por: "",
    cooperativa: "",
    condicion_cooperativa: "",
    periodo_trabajo: "",
    fecha_fin: "",
    gerencia: "",
    area: "",
    jefe_directo: "",
    base: "",
    termino_contrato: "",
    campamento_id: "",
    nota_contrato: "",
    puesto: "",
    asociacion_id: data && data?.id,
    estado: false,
    evaluacion_id: ids,
  };
};
export const valuesContratoEmpresa = (id) => {
  return {
    fecha_inicio: "",
    codigo_contrato: "",
    tipo_contrato: "",
    recomendado_por: "",
    cooperativa: "",
    condicion_cooperativa: "",
    periodo_trabajo: "",
    fecha_fin: "",
    gerencia: "",
    area: "",
    jefe_directo: "",
    base: "",
    termino_contrato: "",
    campamento_id: "",
    nota_contrato: "",
    puesto: "",
    estado: false,
    empresa_id: id
  };
};

export const trabajadorContratoValues = (data) => {
  return {
    fecha_inicio: "",
    codigo_contrato: "",
    tipo_contrato: "",
    recomendado_por: "",
    cooperativa: "",
    condicion_cooperativa: "",
    periodo_trabajo: "",
    fecha_fin: "",
    gerencia: "",
    area: "",
    jefe_directo: "",
    base: "",
    termino_contrato: "",
    campamento_id: "",
    nota_contrato: "",
    puesto: "",
    estado: false,
    volquete: "",
    teletran: "",
    suspendido: false,
    finalizado: false,
    trabajador_id: data,
  };
};

//finanzas
export const IngresoEgresoValues = (id) => {
  return {
    sucursal_id: id,
    fecha: "",
    movimiento: "",
    forma_pago: "",
    encargado: "",
    area: "",
    cantidad: "",
    medida: "",
    descripcion: "",
    monto: "",
    proveedor: "",
    comprobante: "",
    dni: "",
    sucursal_transferencia: "",
    precio: "",
  };
};

export const proveedorValues = {
  nombre: "",
};

export const sucursalValues = {
  nombre: "",
  codigo: "",
  descripcion: "",
  saldo_inicial: "",
};

//logistica
export const almacenValues = {
  nombre: "",
  codigo: "",
  descripcion: "",
};

export const productoValues = (id, codigo) => {
  return {
    codigo: parseInt(codigo) + 1,
    nombre: "",
    codigo_interno: "",
    codigo_barras: "",
    descripcion: "",
    categoria_id: "",
    unidad_id: "",
    precio: "",
    fecha: "",
    observacion: "",
    almacen_id: "",
    stock: "0",
    costo_total: "",
  };
};

export const entradaSalidaValues = (tipo, ) => {
  return {
    codigo: "",
    motivo: "",
    fecha: "",
    encargado: "",
    codigo_compra: "",
    boleta: "",
    codigo_requerimiento: "",
    producto_id: "",
    categoria: "",
    cantidad: "",
    unidad: "",
    tipo: tipo,
    producto: "",
    almacen_id: "",
    codigo_pedido: "",
    costo: "",
    dni: "",
    costo_total: "",
    area_id: "", personal: ""
  };
};

export const requerimientoValues = (id, edit) => {
  return {
    codigo: "",
    fecha_pedido: "",
    fecha_entrega: "",
    solicitante: "",
    area: "",
    celular: "",
    proyecto: "",
    producto_id: "",
    cantidad: "",
    unidad: "",
    estado: "",
    producto: "",
    personal: "",
    dni: ""
  };
};

export const incentivoValues = () => {
  return {
    id: "",
    nombre: "",
    contrato_id: "",
    observacion: "",
    fecha_pago: new Date(),
    teletrans: "",
    tipo: "incentivo",
  };
};

export const incentivosVariosValues = () => {
  return {
    id: "",
    observacion: "",
    fecha_pago: new Date(),
    teletrans: "",
    tipo: "incentivo",
    trabajadores: [],
  };
};

export const casaValues = () => {
  return {
    id: "",
    razon_social: "",
    contrato_id: "",
    observacion: "",
    fecha_pago: new Date(),
    teletrans: "",
    volquetes: "",
    tipo: "casa",
  };
};

export const pagoExtraordinarioValues = () => {
  return {
    id: "",
    nombre: "",
    trabajador_dni: "",
    observacion: "",
    fecha_pago: new Date(),
    hora: new Date(),
    placa: "",
    propietario: "",
    trapiche: "",
    volquetes: "",
    teletrans: "",
    tipo: "extraordinario",
  };
};

export const pagoValues = () => {
  return {
    id: "",
    hora: new Date(),
    placa: "",
    propietario: "",
    trapiche: "",
    volquetes: "",
    teletrans: "",
  };
};

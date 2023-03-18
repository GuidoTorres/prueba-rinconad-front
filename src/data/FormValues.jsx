import { Input, Select, DatePicker, ConfigProvider } from "antd";
import TextArea from "antd/es/input/TextArea";
import locale from "antd/es/date-picker/locale/es_ES";
import dayjs from "dayjs";

//=====================ADMINISTRACION=====================

export const modalUsuario = (usuario, handleData, rol, cargo, dataToEdit) => {
  return [
    {
      label: <label>Nombres</label>,
      name: "nombre",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],

      type: (
        <Input
          value={usuario.nombre}
          type="text"
          name="nombre"
          placeholder="Nombres y apellidos"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Nombre de usuario</label>,
      name: "usuario",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],

      type: (
        <Input
          value={usuario.usuario}
          type="text"
          name="usuario"
          placeholder="Nombre de usuario"
          onChange={handleData}
        />
      ),
    },
    dataToEdit === null
      ? {
          label: <label>Contraseña</label>,
          name: "contrasenia",
          rules: [
            {
              required: true,
              message: "Campo obligatorio!",
            },
          ],

          type: (
            <Input.Password
              value={usuario.contrasenia}
              name="contrasenia"
              placeholder="Contraseña"
              onChange={handleData}
            />
          ),
        }
      : {
          className: "hide",
          label: <label style={{ width: "0", height: "0" }}>Contraseña</label>,
          name: "contrasenia",
          rules: [
            {
              required: false,
            },
          ],

          type: (
            <Input.Password
              style={{ width: "0", height: "0" }}
              value={usuario.contrasenia}
              name="contrasenia"
              placeholder="Contraseña"
              onChange={handleData}
            />
          ),
        },
    {
      label: <label>Rol</label>,
      name: "rol_id",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],

      type: (
        <Select
          placeholder="Rol"
          style={{
            width: "100%",
          }}
          name="rol_id"
          onChange={(e) => handleData(e, "rol_id")}
          value={usuario.rol_id}
        >
          {rol.map((item) => (
            <Select.Option value={item.id}>{item.nombre}</Select.Option>
          ))}
        </Select>
      ),
    },
    {
      label: <label>Cargo</label>,
      name: "cargo_id",
      rules: [
        {
          required: false,
        },
      ],

      type: (
        <Select
          showSearch
          placeholder="Cargo"
          style={{
            width: "100%",
          }}
          optionFilterProp="children"
          name="cargo_id"
          onChange={(e) => handleData(e, "cargo_id")}
          value={usuario.cargo_id}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={cargo.map((item) => {
            return {
              value: item.id,
              label: item.nombre,
            };
          })}
        ></Select>
      ),
    },
    {
      label: <label>Estado</label>,
      name: "estado",
      rules: [
        {
          required: false,
        },
      ],

      type: (
        <Select
          placeholder="Estado"
          style={{
            width: "100%",
          }}
          name="estado"
          onChange={(e) => handleData(e, "estado")}
          value={usuario.estado}
        >
          <Select.Option value={true}>Activo</Select.Option>
          <Select.Option value={false}>Inactivo</Select.Option>
        </Select>
      ),
    },
    // {
    //   name: "imagen",
    //   rules: [
    //     {
    //       required: true,
    //       message: "Campo obligatorio!",
    //     },
    //   ],

    //   type: (
    //     <Upload
    //       action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    //       listType="picture"
    //       // defaultFileList={[...fileList]}
    //     >
    //       <Button icon={<UploadOutlined />}>Upload</Button>
    //     </Upload>
    //   ),
    // },
  ];
};

export const modalAsignarRol = (rol, handleData, nombre, puesto, roluser) => {
  return [
    {
      label: <label>Nombre</label>,
      name: "nombre",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],

      type: (
        <Input
          value={rol.nombre}
          type="text"
          name="nombre"
          placeholder="Nombre de rol"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Descripción</label>,
      name: "descripcion",
      rules: [
        {
          required: false,
        },
      ],

      type: (
        <Input
          value={rol.descripcion}
          type="text"
          name="descripcion"
          placeholder="Descripción"
          onChange={handleData}
        />
      ),
    },
  ];
};

export const modalCampamento = (campamento, handleData) => {
  return [
    {
      label: <label>Nombre</label>,
      name: "nombre",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],

      type: (
        <Input
          value={campamento.nombre}
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Dirección</label>,
      name: "direccion",
      rules: [
        {
          required: false,
        },
      ],

      type: (
        <Input
          value={campamento.direccion}
          type="text"
          name="direccion"
          placeholder="Dirección"
          onChange={handleData}
        />
      ),
    },
  ];
};

export const modalRegistrarSocio = (socio, handleData) => {
  return [
    {
      label: <label>Apellidos y nombres</label>,
      name: "nombre",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],

      type: (
        <Input
          value={socio.nombre}
          type="text"
          name="nombre"
          placeholder="Apellidos y nombres"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Dni</label>,
      name: "dni",
      rules: [
        {
          required: false,
        },
      ],

      type: (
        <Input
          value={socio.dni}
          type="number"
          name="dni"
          placeholder="Dni"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Teléfono</label>,
      name: "telefono",
      rules: [
        {
          required: false,
        },
      ],

      type: (
        <Input
          value={socio.telefono}
          type="number"
          name="telefono"
          placeholder="Teléfono"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Cooperativa</label>,
      name: "cooperativa",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          placeholder="Cooperativa"
          style={{
            width: "100%",
          }}
          name="cooperativa"
          onChange={(e) => handleData(e, "cooperativa")}
          value={socio.cooperativa}
        >
          <Select.Option value="Cerro San Francisco">
            Cerro San Francisco
          </Select.Option>
          <Select.Option value="Lunar de Oro">Lunar de Oro</Select.Option>
          <Select.Option value="San Francisco">San Francisco</Select.Option>
        </Select>
      ),
    },
  ];
};

//=====================PERSONAL============================

export const modalRegistroTrabajador = (
  trabajador,
  handleData,
  cod,
  asociacion
) => {
  return [
    {
      label: <label>Dni</label>,
      name: "dni",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],

      type: (
        <Input
          value={trabajador.dni}
          type="number"
          name="dni"
          placeholder="Dni"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Codigo Trabajador</label>,
      name: "codigo_trabajador",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          disabled
          value={trabajador.codigo_trabajador || cod}
          type="text"
          name="codigo_trabajador"
          onChange={handleData}
        />
      ),
    },

    {
      label: <label>Nombre</label>,
      name: "nombre",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],
      type: (
        <Input
          value={trabajador.nombre}
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Apellido paterno</label>,
      name: "apellido_paterno",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],
      type: (
        <Input
          value={trabajador.apellido_paterno}
          type="text"
          name="apellido_paterno"
          placeholder="Apellido paterno"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Apellido materno</label>,
      name: "apellido_materno",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],
      type: (
        <Input
          value={trabajador.apellido_materno}
          type="text"
          name="apellido_materno"
          placeholder="Apellido materno"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Fecha de nacimiento</label>,
      name: "proyecto",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          type="date"
          value={trabajador?.fecha_nacimiento?.split("T")[0]}
          name="fecha_nacimiento"
          placeholder="Fecha de nacimiento"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Teléfono</label>,
      name: "telefono",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={trabajador.telefono}
          type="number"
          name="telefono"
          placeholder="Teléfono"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Email</label>,
      name: "email",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={trabajador.email}
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Estado civil</label>,
      name: "estado_civil",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          placeholder="Estado civil"
          style={{
            width: "100%",
          }}
          name="estado_civil"
          onChange={(e) => handleData(e, "estado_civil")}
          value={trabajador.estado_civil}
        >
          <Select.Option value="Soltero">Soltero</Select.Option>
          <Select.Option value="Casaso">Casado</Select.Option>
          <Select.Option value="Viudo">Viudo</Select.Option>
          <Select.Option value="Divorciado">Divorciado</Select.Option>
        </Select>
      ),
    },
    {
      label: <label>Género</label>,
      name: "genero",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          placeholder="Género"
          style={{
            width: "100%",
          }}
          name="genero"
          onChange={(e) => handleData(e, "genero")}
          value={trabajador.genero}
        >
          <Select.Option value="Masculino">Masculino</Select.Option>
          <Select.Option value="Femenino">Femenino</Select.Option>
        </Select>
      ),
    },
    {
      label: <label>Dirección</label>,
      name: "direccion",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={trabajador.direccion}
          type="text"
          name="direccion"
          placeholder="Dirección"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Asociación</label>,
      name: "direccion",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          placeholder="Asociación"
          style={{
            width: "100%",
          }}
          name="asociacion_id"
          onChange={(e) => handleData(e, "asociacion_id")}
          value={trabajador.asociacion_id}
        >
          <Select.Option value={null}>Sin Asociación</Select.Option>
          {asociacion?.map((item) => (
            <Select.Option value={item.id}>{item.nombre}</Select.Option>
          ))}
        </Select>
      ),
    },
  ];
};

export const modalRegistroAsociacion = (asociacion, handleData) => {
  return [
    {
      label: <label>Tipo de asociación</label>,
      name: "tipo",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],
      type: (
        <Select
          defaultValue="Tipo de asociación"
          style={{
            width: "100%",
          }}
          name="tipo"
          onChange={(e) => handleData(e, "tipo")}
          value={asociacion.tipo}
        >
          <Select.Option value="Canteadores">Canteadores</Select.Option>
          <Select.Option value="Inspectores">Inspectores</Select.Option>
          <Select.Option value="Vigilantes">Vigilantes</Select.Option>
        </Select>
      ),
    },
    {
      label: <label>Nombre asociación</label>,
      name: "nombre",
      rules: [
        {
          required: false,
        },
      ],

      type: (
        <Input
          value={asociacion.nombre}
          type="text"
          name="nombre"
          placeholder="Nombre asociacion"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Código asociación</label>,
      name: "codigo",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={asociacion.codigo}
          type="text"
          name="codigo"
          placeholder="Código asociación"
          onChange={handleData}
        />
      ),
    },
  ];
};

export const modalRegistroContratoPersonal = (
  contrato,
  handleData,
  cargo,
  campamento,
  gerencia,
  area,
  id,
  dataToEdit
) => {
  return [
    {
      label: <label>Código contrato</label>,
      name: "codigo_contrato",
      rules: [
        {
          required: false,
        },
      ],

      type: (
        <Input
          disabled
          value={dataToEdit !== null ? contrato?.id : id}
          type="text"
          name="codigo_contrato"
          placeholder="Codigo de contrato"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Gerencia</label>,
      name: "gerencia",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          placeholder="Gerencia"
          style={{
            width: "100%",
          }}
          name="gerencia"
          value={contrato?.gerencia}
          onChange={(e) => handleData(e, "gerencia")}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={gerencia.map((item) => {
            return {
              label: item.nombre,
              value: item.nombre,
            };
          })}
        />
      ),
    },
    {
      label: <label>Área</label>,
      name: "area",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          value={contrato?.area}
          name="area"
          onChange={(e) => handleData(e, "area")}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={
            contrato.gerencia !== ""
              ? area
                  ?.filter(
                    (item) => item?.gerencium.nombre === contrato?.gerencia
                  )
                  ?.map((item) => {
                    return {
                      label: item.nombre,
                      value: item.nombre,
                    };
                  })
              : area?.map((item) => {
                  return {
                    label: item.nombre,
                    value: item.nombre,
                  };
                })
          }
        />
      ),
    },
    {
      label: <label>Puesto o Rol</label>,
      name: "puesto",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          value={contrato?.puesto}
          name="puesto"
          onChange={(e) => handleData(e, "puesto")}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={
            contrato.area !== ""
              ? cargo
                  ?.filter((item) => item?.area?.nombre === contrato?.area)
                  ?.map((item) => {
                    return {
                      label: item.nombre,
                      value: item.nombre,
                    };
                  })
              : cargo?.map((item) => {
                  return {
                    label: item.nombre,
                    value: item.nombre,
                  };
                })
          }
        />
      ),
    },
    {
      label: <label>Fecha de ingreso</label>,
      name: "fecha_inicio",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          type="date"
          value={contrato?.fecha_inicio?.split("T")[0]}
          name="fecha_inicio"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Fecha de fin</label>,
      name: "fecha_fin",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          type="date"
          value={contrato?.fecha_fin}
          name="fecha_fin"
          onChange={handleData}
        />
      ),
    },

    {
      label: <label>Tareo (días de trabajo)</label>,
      name: "tareo",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          value={contrato?.tareo}
          name="tareo"
          onChange={(e) => handleData(e, "tareo")}
          options={[
            {
              label: "Mes cerrado",
              value: "Mes cerrado",
            },
            {
              label: "Lunes a sabado",
              value: "Lunes a sabado",
            },
          ]}
        />
      ),
    },
    {
      label: <label>Perido de trabajo(quincena)</label>,
      name: "periodo_trabajo",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          type="number"
          value={contrato?.periodo_trabajo}
          name="periodo_trabajo"
          onChange={handleData}
        />
      ),
    },

    {
      label: <label>Tipo de contrato</label>,
      name: "tipo_contrato",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          placeholder="Tipo de contrato"
          style={{
            width: "100%",
          }}
          name="tipo_contrato"
          value={contrato?.tipo_contrato}
          onChange={(e) => handleData(e, "tipo_contrato")}
          options={[
            {
              label: "Especies",
              value: "Especies",
            },
            {
              label: "Planilla",
              value: "Planilla",
            },
          ]}
        />
      ),
    },

    {
      label: <label>Campamento</label>,
      name: "campamento_id",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          value={contrato?.campamento_id}
          name="campamento_id"
          onChange={(e) => handleData(e, "campamento_id")}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={campamento?.map((item) => {
            return {
              label: item.nombre,
              value: item.id,
            };
          })}
        />
      ),
    },
    {
      label: <label>Jefe directo</label>,
      name: "jefe_directo",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          value={contrato?.jefe_directo}
          name="jefe_directo"
          onChange={(e) => handleData(e, "jefe_directo")}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={cargo?.map((item) => {
            return {
              label: item.nombre,
              value: item.nombre,
            };
          })}
        />
      ),
    },
    {
      label: <label>Volquete</label>,
      name: "volquete",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={contrato?.volquete}
          name="volquete"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Teletrans</label>,
      name: "teletran",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={contrato?.teletran}
          name="teletran"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Termino de finalización</label>,
      name: "supendido",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          value={contrato?.suspendido}
          name="suspendido"
          onChange={(e) => handleData(e, "suspendido")}
          options={[
            {
              label: "Normal",
              value: false,
            },
            {
              label: "Suspendido",
              value: true,
            },
          ]}
        />
      ),
    },
    {
      label: <label>Termino de contrato</label>,
      name: "termino_contrato",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <TextArea
          value={contrato?.termino_contrato}
          name="termino_contrato"
          onChange={handleData}
          rows={1}
        />
      ),
    },
    {
      label: <label>Nota de contrato</label>,
      name: "nota_contrato",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={contrato?.nota_contrato}
          name="nota_contrato"
          onChange={handleData}
        />
      ),
    },
  ];
};

export const modalRegistroContratoAsociacion = (
  contrato,
  handleData,
  cargo,
  campamento,
  gerencia,
  area,
  form,
  dataToEdit,
  id
) => {
  return [
    {
      label: <label>Código contrato</label>,
      name: "codigo_contrato",
      rules: [
        {
          required: false,
        },
      ],

      type: (
        <Input
          disabled
          value={contrato?.codigo_contrato}
          type="text"
          name="codigo_contrato"
          placeholder="Codigo de contrato"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Fecha de ingreso</label>,
      name: "codigo",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          type="date"
          value={contrato?.fecha_inicio}
          name="fecha_inicio"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Fecha de fin</label>,
      name: "fecha_fin",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          type="date"
          value={contrato?.fecha_fin}
          name="fecha_fin"
          onChange={handleData}
        />
      ),
    },

    {
      label: <label>Perido de trabajo(quincena)</label>,
      name: "periodo_trabajo",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          type="number"
          value={contrato?.periodo_trabajo}
          name="periodo_trabajo"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Tipo de contrato</label>,
      name: "tipo_contrato",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          placeholder="Tipo de contrato"
          style={{
            width: "100%",
          }}
          name="tipo_contrato"
          onChange={(e) => handleData(e, "tipo_contrato")}
          value={contrato?.tipo_contrato}
        >
          <Select.Option value="Especies">Especies</Select.Option>
          <Select.Option value="Planilla">Planilla</Select.Option>
        </Select>
      ),
    },
    {
      label: <label>Gerencia</label>,
      name: "gerencia",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          placeholder="Gerencia"
          style={{
            width: "100%",
          }}
          name="gerencia"
          onChange={(e) => handleData(e, "gerencia")}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          value={contrato.gerencia}
          options={gerencia.map((item) => {
            return {
              label: item.nombre,
              value: item.nombre,
            };
          })}
        />
      ),
    },
    {
      label: <label>Área</label>,
      name: "area",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          value={contrato?.area}
          name="area"
          onChange={(e) => handleData(e, "area")}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={area?.map((item) => {
            return {
              label: item.nombre,
              value: item.nombre,
            };
          })}
        />
      ),
    },
    {
      label: <label>Campamento</label>,
      name: "campamento_id",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          value={contrato?.campamento_id}
          name="campamento_id"
          onChange={(e) => handleData(e, "campamento_id")}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={campamento?.map((item) => {
            return {
              label: item.nombre,
              value: item.id,
            };
          })}
        />
      ),
    },
    {
      label: <label>Jefe directo</label>,
      name: "jefe_directo",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          value={contrato?.jefe_directo}
          name="jefe_directo"
          onChange={(e) => handleData(e, "jefe_directo")}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={cargo?.map((item) => {
            return {
              label: item.nombre,
              value: item.nombre,
            };
          })}
        />
      ),
    },
    {
      label: <label>Base</label>,
      name: "base",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          value={contrato?.base}
          name="base"
          onChange={(e) => handleData(e, "base")}
          options={[
            {
              label: "Lunar de Oro",
              value: "1",
            },
            { label: "Rinconada", value: "2" },
          ]}
        />
      ),
    },
    {
      label: <label>Volquete</label>,
      name: "volquete",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={contrato?.volquete}
          name="volquete"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Teletrans</label>,
      name: "teletran",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={contrato?.teletran}
          name="teletran"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Termino de finalización</label>,
      name: "supendido",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          value={contrato?.suspendido}
          name="suspendido"
          onChange={(e) => handleData(e, "supendido")}
          options={[
            {
              label: "Normal",
              value: false,
            },
            {
              label: "Suspendido",
              value: true,
            },
          ]}
        />
      ),
    },
    {
      label: <label>Termino de contrato</label>,
      name: "termino_contrato",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <TextArea
          value={contrato?.termino_contrato}
          name="termino_contrato"
          onChange={handleData}
          rows={1}
        />
      ),
    },
    {
      label: <label>Nota de contrato</label>,
      name: "nota_contrato",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={contrato?.nota_contrato}
          name="nota_contrato"
          onChange={handleData}
        />
      ),
    },
  ];
};

export const modalRegistroEmpresa = (empresa, handleData) => {
  return [
    {
      label: <label>Razón social</label>,
      name: "razon_social",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],

      type: (
        <Input
          value={empresa.razon_social}
          type="text"
          name="razon_social"
          placeholder="Razón social"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Ruc empresa</label>,
      name: "ruc",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={empresa.ruc}
          type="text"
          name="ruc"
          placeholder="Ruc"
          onChange={handleData}
        />
      ),
    },
  ];
};

export const modalContratoEmpresa = (
  contrato,
  handleData,
  gerencia,
  cargo,
  campamento,
  socio
) => {
  return [
    {
      label: <label>Código de contrato</label>,
      name: "movimiento",
      rules: [
        {
          required: false,
        },
      ],

      type: (
        <Input
          disabled
          value={contrato?.codigo_contrato}
          type="text"
          name="codigo_contrato"
          placeholder="codigo_contrato"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Fecha de ingreso</label>,
      name: "fecha_inicio",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],
      type: (
        <Input
          type="date"
          value={contrato?.fecha_inicio}
          name="fecha_inicio"
          onChange={handleData}
        />
      ),
    },

    {
      label: <label>Fecha de fin</label>,
      name: "fecha_fin",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],
      type: (
        <Input
          type="date"
          value={contrato?.fecha_fin}
          name="fecha_fin"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Periodo de trabajo</label>,
      name: "periodo_trabajo",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],
      type: (
        <Input
          value={contrato?.periodo_trabajo}
          type="text"
          name="periodo_trabajo"
          placeholder="Periodo de trabajo"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Tipo de contrato</label>,
      name: "tipo_contrato",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          placeholder="Tipo de contrato"
          style={{
            width: "100%",
          }}
          name="tipo_contrato"
          onChange={(e) => handleData(e, "tipo_contrato")}
          value={contrato?.tipo_contrato}
        >
          <Select.Option value="Especies">Especies</Select.Option>
          <Select.Option value="Planilla">Planilla</Select.Option>
        </Select>
      ),
    },
    {
      label: <label>Gerencia</label>,
      name: "gerencia",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          placeholder="Gerencia"
          style={{
            width: "100%",
          }}
          name="gerencia"
          onChange={(e) => handleData(e, "gerencia")}
          value={contrato?.gerencia}
        >
          {gerencia?.map((item) => (
            <Select.Option value={item.nombre}>{item.nombre}</Select.Option>
          ))}
        </Select>
      ),
    },
    {
      label: <label>Campamento</label>,
      name: "campamento",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          placeholder="Campamento"
          style={{
            width: "100%",
          }}
          name="campamento_id"
          onChange={(e) => handleData(e, "campamento_id")}
          value={contrato?.campamento_id}
        >
          {campamento?.map((item, i) => (
            <Select.Option key={i} value={item.id}>
              {item.nombre}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      label: <label>Volquetes</label>,
      name: "volquete",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={contrato?.volquete}
          type="text"
          name="volquete"
          placeholder="Volquete"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Teletrans</label>,
      name: "teletran",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={contrato?.teletran}
          type="text"
          name="teletran"
          placeholder="Teletrans"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Termino finalización</label>,
      name: "suspendido",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          placeholder="Termino finalización"
          style={{
            width: "100%",
          }}
          name="suspendido"
          onChange={(e) => handleData(e, "suspendido")}
          value={contrato?.suspendido}
        >
          <Select.Option value={false}>Normal</Select.Option>
          <Select.Option value={true}>Suspendido</Select.Option>
        </Select>
      ),
    },
    {
      label: <label>Termino de contrato</label>,
      name: "termino_contrato",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={contrato?.termino_contrato}
          type="text"
          name="termino_contrato"
          placeholder="Termino de contrato"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Nota de contrato</label>,
      name: "nota_contrato",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={contrato?.nota_contrato}
          type="text"
          name="nota_contrato"
          placeholder="Nota de contrato"
          onChange={handleData}
        />
      ),
    },
  ];
};

// =====================FINANZAS===========================

export const modalRegistrarMovimiento = (
  sucursal,
  handleData,
  area,
  proveedor,
  data,
  unidad,
  id,
  categoria
) => {
  return [
    {
      label: <label>Fecha del movimiento</label>,
      name: "fecha",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],

      type: (
        <Input
          type="date"
          name="fecha"
          placeholder="Ingrese la fecha"
          onChange={handleData}
          value={sucursal?.fecha}
        />
      ),
    },
    {
      label: <label>Movimientos</label>,
      name: "movimiento",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],

      type: (
        <Select
          placeholder="Movimiento"
          style={{
            width: "100%",
          }}
          name="movimiento"
          onChange={(e) => handleData(e, "movimiento")}
          value={sucursal.movimiento}
        >
          <Select.Option value="Ingreso">Ingreso</Select.Option>
          <Select.Option value="Egreso">Egreso</Select.Option>
        </Select>
      ),
    },
    {
      label: <label>Forma de pago</label>,
      name: "forma_pago",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],

      type: (
        <Select
          placeholder="Forma de pago"
          style={{
            width: "100%",
          }}
          name="forma_pago"
          onChange={(e) => handleData(e, "forma_pago")}
          value={sucursal.forma_pago}
        >
          <Select.Option value="Efectivo">Efectivo</Select.Option>
          <Select.Option value="Yape">Yape</Select.Option>
          <Select.Option value="Deposito en cuenta">
            Deposito en cuenta
          </Select.Option>
          <Select.Option value="Transferencia bancaria">
            Transferencia bancaria
          </Select.Option>
        </Select>
      ),
    },

    {
      label: <label>Dni</label>,
      name: "dni",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],
      type: (
        <Input
          value={sucursal.dni}
          type="number"
          name="dni"
          placeholder="Dni"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Responsable del movimiento</label>,
      name: "encargado",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],
      type: (
        <Input
          value={sucursal.encargado}
          type="text"
          name="encargado"
          placeholder="Responsable del movimiento"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Área</label>,
      name: "area",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],
      type: (
        <Select
          placeholder="Área"
          style={{
            width: "100%",
          }}
          name="area"
          onChange={(e) => handleData(e, "area")}
          value={sucursal.area}
          options={area.map((item) => {
            return {
              label: item.nombre,
              value: item.nombre,
            };
          })}
        />
      ),
    },
    {
      label: <label>Destino de transferencia</label>,
      name: "sucursal_transferencia",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          placeholder="Destino de transferencia"
          style={{
            width: "100%",
          }}
          name="sucursal_transferencia"
          onChange={(e) => handleData(e, "sucursal_transferencia")}
          value={sucursal.sucursal_transferencia}
          options={data
            ?.filter((item) => item.id !== id)
            ?.map((item) => {
              return {
                label: item.nombre,
                value: item.id,
              };
            })}
        />
      ),
    },
    {
      label: <label>Descripción</label>,
      name: "descripcion",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={sucursal.descripcion}
          type="text"
          name="descripcion"
          placeholder="Descripcion"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Medida</label>,
      name: "medida",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          placeholder="Medida"
          style={{
            width: "100%",
          }}
          name="medida"
          onChange={(e) => handleData(e, "medida")}
          value={sucursal.medida}
          options={unidad?.map((item) => {
            return {
              label: item.nombre,
              value: item.nombre,
            };
          })}
        />
      ),
    },

    {
      label: <label>Cantidad</label>,
      name: "cantidad",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={sucursal.cantidad}
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Categoría</label>,
      name: "categoria",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          placeholder="Categoria"
          style={{
            width: "100%",
          }}
          name="categoria"
          onChange={(e) => handleData(e, "categoria")}
          value={sucursal.categoria}
          options={categoria?.map((item) => {
            return {
              label: item.descripcion,
              value: item.descripcion,
            };
          })}
        />
      ),
    },

    {
      label: <label>Precio por unidad</label>,
      name: "precio",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={sucursal.precio ? parseFloat(sucursal.precio).toFixed(2) : ""}
          disabled
          type="text"
          name="precio"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Monto</label>,
      name: "monto",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={sucursal.monto}
          type="number"
          name="monto"
          placeholder="Monto"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Proveedor</label>,
      name: "proveedor",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          placeholder="Proveedor"
          style={{
            width: "100%",
          }}
          name="proveedor"
          onChange={(e) => handleData(e, "proveedor")}
          value={sucursal.proveedor}
          options={proveedor.map((item) => {
            return {
              label: item.nombre,
              value: item.nombre,
            };
          })}
        />
      ),
    },
    {
      label: <label>Comprobante</label>,
      name: "proveedor",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          placeholder="Comprobante"
          style={{
            width: "100%",
          }}
          name="forma_pago"
          onChange={(e) => handleData(e, "comprobante")}
          value={sucursal.comprobante}
        >
          <Select.Option value="Factura electronica">
            Factura electronica
          </Select.Option>
          <Select.Option value="Boleta de Venta">Boleta de venta</Select.Option>
          <Select.Option value="Bolecta electronica">
            Bolecta electronica
          </Select.Option>
          <Select.Option value="Nota de pedido">Nota de pedido</Select.Option>
          <Select.Option value="Nota de venta">Nota de venta</Select.Option>
          <Select.Option value="Recibo">Recibo</Select.Option>
          <Select.Option value="Recibo externo">Recibo externo</Select.Option>
          <Select.Option value="Declaración jurada">
            Declaración jurada
          </Select.Option>
          <Select.Option value="Proforma">Proforma</Select.Option>
          <Select.Option value="Tickets">Tickets</Select.Option>
          <Select.Option value="Constancia">Constancia</Select.Option>
          <Select.Option value="Transferencia">Transferencia</Select.Option>
          <Select.Option value="Voucher">Voucher</Select.Option>
          <Select.Option value="Lista">Lista</Select.Option>
          <Select.Option value="Planilla de gastos de movilidad">
            Planilla de gastos de movilidad
          </Select.Option>
          <Select.Option value="Contrato">Contrato</Select.Option>
          <Select.Option value="Recibo por honorarios">
            Recibo por honorarios
          </Select.Option>
        </Select>
      ),
    },
    {
      label: <label>Nro</label>,
      name: "nro_comprobante",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={sucursal.nro_comprobante}
          type="text"
          name="nro_comprobante"
          placeholder="Nro de comprobante"
          onChange={handleData}
        />
      ),
    },
    {
      label: "",
      name: "",
      rules: [
        {
          required: false,
        },
      ],
      type: "",
    },
    {
      label: "",
      name: "",
      rules: [
        {
          required: false,
        },
      ],
      type: "",
    },
  ];
};

export const modalRegistrarProveedor = (proveedor, handleData) => {
  return [
    {
      label: <label>Nombre</label>,
      name: "nombre",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],

      type: (
        <Input
          value={proveedor.nombre}
          name="nombre"
          placeholder="Nombre"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Dni o Ruc</label>,
      name: "dni",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],
      type: (
        <Input
          value={proveedor.dni}
          name="dni"
          placeholder="Dni o Ruc"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Dirección</label>,
      name: "direccion",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={proveedor.direccion}
          name="direccion"
          placeholder="Direccíon"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Télefono</label>,
      name: "telefono",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],
      type: (
        <Input
          value={proveedor.telefono}
          name="telefono"
          placeholder="Telefono"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Descripción</label>,
      name: "fecha",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={proveedor.descripcion}
          name="descripcion"
          placeholder="Descripción"
          onChange={handleData}
        />
      ),
    },
  ];
};

export const modalRegistrarSucursal = (sucursal, handleData, dataToEdit) => {
  return [
    {
      label: <label>Nombre</label>,
      name: "nombre",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],

      type: (
        <Input
          value={sucursal.nombre}
          name="nombre"
          placeholder="Nombre"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Código</label>,
      name: "codigo",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],
      type: (
        <Input
          value={sucursal.codigo}
          name="codigo"
          placeholder="Código"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Descripción</label>,
      name: "descripcion",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={sucursal.descripcion}
          name="descripcion"
          placeholder="Descripción"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Saldo inicial</label>,
      name: "saldo_inicial",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],
      type: (
        <Input
          disabled={dataToEdit !== null ? true : false}
          value={sucursal.saldo_inicial}
          name="saldo_inicial"
          placeholder="saldo_inicial"
          onChange={handleData}
        />
      ),
    },
  ];
};

//=====================LOGISTICA===========================

//modal registro de productos
export const modalRegistroProducto = (
  producto,
  handleData,
  productoId,
  categoria,
  unidad
) => {
  return [
    {
      label: <label>Nombre</label>,
      name: "nombre",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],

      type: (
        <Input
          placeholder="Nombre"
          value={producto.nombre}
          name="nombre"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Codigo</label>,
      name: "codigo",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          disabled
          value={parseInt(productoId) + 1}
          name="codigo"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Código interno</label>,
      name: "codigo_interno",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={producto.codigo_interno}
          type="text"
          name="codigo_interno"
          placeholder="Código interno"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Código de barras</label>,
      name: "codigo_barras",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={producto.codigo_barras}
          type="text"
          name="codigo_barras"
          placeholder="Código de barras"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Descripción</label>,
      name: "descripcion",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={producto.descripcion}
          type="text"
          name="descripcion"
          placeholder="Descripción"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Categoría</label>,
      name: "categoria_id",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          defaultValue="Seleccione"
          placeholder=""
          name="categoria_id"
          onChange={(e) => handleData(e, "categoria_id")}
          value={producto.categoria_id}
        >
          {categoria.map((item, i) => (
            <Select.Option value={item.id}>{item.descripcion}</Select.Option>
          ))}
        </Select>
      ),
    },
    {
      label: <label>Unidad</label>,
      name: "unidad_id",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Select
          defaultValue="Seleccione"
          name="unidad_id"
          onChange={(e) => handleData(e, "unidad_id")}
          value={producto.unidad_id}
        >
          {unidad.map((item, i) => (
            <Select.Option value={item.id}>{item.nombre}</Select.Option>
          ))}
        </Select>
      ),
    },
    {
      label: <label>Precio</label>,
      name: "precio",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          type="text"
          name="precio"
          onChange={handleData}
          value={producto.precio}
        />
      ),
    },
    {
      label: <label>Costo total</label>,
      name: "costo",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          type="text"
          name="costo"
          disabled
          onChange={handleData}
          value={parseInt(producto.stock) * parseInt(producto.precio) || ""}
        />
      ),
    },
    {
      label: <label>Fecha de registro</label>,
      name: "fecha",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          type="date"
          name="fecha"
          placeholder="Ingrese la fecha"
          onChange={handleData}
          style={{ width: "100%" }}
          value={producto.fecha}
        />
      ),
    },
    {
      label: <label>Observaciones</label>,
      name: "observacion",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          type="text"
          name="observacion"
          onChange={handleData}
          value={producto.observacion}
        />
      ),
    },
  ];
};

//modal registro de almacen
export const modalAlmacen = (almacen, handleData) => {
  return [
    {
      label: <label>Nombre</label>,
      name: "nombre",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],

      type: (
        <Input
          value={almacen.nombre}
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Código</label>,
      name: "codigo",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={almacen.codigo}
          type="text"
          name="codigo"
          placeholder="Codigo"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Descripción</label>,
      name: "descripcion",
      rules: [
        {
          required: false,
        },
      ],
      type: (
        <Input
          value={almacen.descripcion}
          type="text"
          name="descripcion"
          placeholder="Descripcion"
          onChange={handleData}
        />
      ),
    },
  ];
};

// modal generar pedido
export const generarPedido = (pedido, handleData, area) => {
  return [
    {
      label: <label>Solicitante</label>,
      name: "solicitante",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],

      type: (
        <Input
          value={pedido.solicitante}
          type="text"
          name="solicitante"
          placeholder="Solicitante"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Área</label>,
      name: "area",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],
      type: (
        <Select
          placeholder="Área"
          style={{
            width: "100%",
          }}
          name="area"
          onChange={(e) => handleData(e, "area")}
          value={pedido.area}
        >
          {area.map((item, i) => (
            <Select.Option value={item.nombre}>{item.nombre}</Select.Option>
          ))}
        </Select>
      ),
    },
    {
      label: <label>Proyecto</label>,
      name: "proyecto",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],
      type: (
        <Input
          value={pedido.proyecto}
          type="text"
          name="proyecto"
          placeholder="Proyecto"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Celular</label>,
      name: "celular",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],
      type: (
        <Input
          value={pedido.celular}
          type="text"
          name="celular"
          placeholder="Celular"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Fecha</label>,
      name: "fecha",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],
      type: (
        <Input
          type="date"
          value={pedido.fecha}
          style={{
            width: "100%",
          }}
          name="fecha"
          placeholder="Fecha"
          onChange={handleData}
        />
      ),
    },
  ];
};

// ==================== Planilla

// modal registro de incentivo
export const modalIncentivo = (
  incentivo,
  handleData,
  trabajadores,
  dataToEdit
) => {
  const dataTrabajadores = trabajadores.map((item) => {
    return {
      value: item.contrato_id,
      label: item.nombre,
    };
  });

  return [
    {
      label: <label>Trabajador</label>,
      name: "nombre",
      rules: [
        {
          required: true,
          message: "Seleccione un trabajador.",
        },
      ],

      type: (
        <Select
          showSearch
          disabled={dataToEdit ? true : false}
          placeholder="Trabajadores"
          style={{
            width: "100%",
          }}
          name="nombre"
          onChange={(e) => {
            const trabajador = trabajadores.find(
              (item) => item.contrato_id === e
            );
            handleData(trabajador.nombre, "nombre");
            handleData(trabajador.contrato_id, "contrato_id");
          }}
          value={incentivo.nombre}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={dataTrabajadores}
        />
      ),
    },
    {
      label: <label>Incentivo (Teletrans) </label>,
      name: "teletrans",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],

      type: (
        <Input
          value={incentivo.teletrans}
          type="number"
          name="teletrans"
          min={0}
          placeholder="Incentivo"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Observación</label>,
      name: "observacion",
      type: (
        <Input
          value={incentivo.observacion}
          type="text"
          name="observacion"
          placeholder="Observación"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Fecha Pago</label>,
      name: "fecha_pago",
      type: (
        <ConfigProvider locale={locale}>
          <DatePicker
            allowClear={false}
            value={dayjs(incentivo.fecha_pago)}
            name="fecha_pago"
            placeholder="Fecha de Pago"
            picker="day"
            onChange={(e) => handleData(e, "fecha_pago")}
            style={{
              width: "100%",
            }}
            format={"YYYY-MM-DD"}
          />
        </ConfigProvider>
      ),
    },
  ];
};

// modal registro de casa
export const modalCasa = (casa, handleData, empresas, dataToEdit) => {
  const dataEmpresa = empresas.map((item) => {
    return {
      value: item.id,
      label: item.razon_social,
    };
  });

  return [
    {
      label: <label>Razon Social</label>,
      name: "razon_social",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],
      type: (
        <Select
          showSearch
          disabled={dataToEdit}
          placeholder="Razon Social"
          style={{
            width: "100%",
          }}
          name="razon_social"
          onChange={(e) => {
            const empresa = empresas.find((item) => item.id === e);
            handleData(empresa.razon_social, "razon_social");
            handleData(empresa.contrato_id, "contrato_id");
          }}
          value={casa.razon_social}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={dataEmpresa}
        />
      ),
    },
    {
      label: <label>Teletrans</label>,
      name: "teletrans",
      type: (
        <Input
          value={casa.teletrans}
          type="number"
          name="teletrans"
          min={0}
          placeholder="Teletrans"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Volquetes </label>,
      name: "volquetes",

      type: (
        <Input
          value={casa.volquetes}
          type="number"
          name="volquetes"
          min={0}
          placeholder="Volquetes"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Observación</label>,
      name: "observacion",
      type: (
        <Input
          value={casa.observacion}
          type="text"
          name="observacion"
          placeholder="Observación"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Fecha Pago</label>,
      name: "fecha_pago",
      type: (
        <ConfigProvider locale={locale}>
          <DatePicker
            allowClear={false}
            value={dayjs(casa.fecha_pago)}
            name="fecha_pago"
            placeholder="Fecha de Pago"
            picker="day"
            onChange={(e) => handleData(e, "fecha_pago")}
            style={{
              width: "100%",
            }}
            format={"YYYY-MM-DD"}
          />
        </ConfigProvider>
      ),
    },
  ];
};

// modal registro de pago extraordinario
export const modalPagoExtraordinario = (
  pagoExtraordinario,
  handleData,
  trabajadores,
  dataToEdit
) => {
  const dataTrabajadores = trabajadores.map((item) => {
    return {
      value: item.dni,
      label: item.nombre,
    };
  });

  return [
    {
      label: <label>Trabajador</label>,
      name: "nombre",
      rules: [
        {
          required: true,
          message: "Seleccione un trabajador.",
        },
      ],

      type: (
        <Select
          showSearch
          disabled={dataToEdit ? true : false}
          placeholder="Trabajadores"
          style={{
            width: "100%",
          }}
          name="nombre"
          onChange={(e) => {
            const trabajador = trabajadores.find((item) => item.dni === e);
            handleData(trabajador.nombre, "nombre");
            handleData(trabajador.dni, "trabajador_dni");
          }}
          value={pagoExtraordinario.nombre}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={dataTrabajadores}
        />
      ),
    },
    {
      label: <label>Teletrans </label>,
      name: "teletrans",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],

      type: (
        <Input
          value={pagoExtraordinario.teletrans}
          type="number"
          name="teletrans"
          min={0}
          placeholder="Teletrans"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Volquetes </label>,
      name: "volquetes",
      rules: [
        {
          required: true,
          message: "Campo obligatorio!",
        },
      ],

      type: (
        <Input
          value={pagoExtraordinario.volquetes}
          type="number"
          name="volquetes"
          min={0}
          placeholder="Volquetes"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Observación</label>,
      name: "observacion",
      type: (
        <Input
          value={pagoExtraordinario.observacion}
          type="text"
          name="observacion"
          placeholder="Observación"
          onChange={handleData}
        />
      ),
    },
    {
      label: <label>Fecha Pago</label>,
      name: "fecha_pago",
      type: (
        <ConfigProvider locale={locale}>
          <DatePicker
            allowClear={false}
            value={dayjs(pagoExtraordinario.fecha_pago)}
            name="fecha_pago"
            placeholder="Fecha de Pago"
            picker="day"
            onChange={(e) => handleData(e, "fecha_pago")}
            style={{
              width: "100%",
            }}
            format={"YYYY-MM-DD"}
          />
        </ConfigProvider>
      ),
    },
  ];
};

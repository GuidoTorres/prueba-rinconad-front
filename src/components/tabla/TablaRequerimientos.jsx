import { Empty } from "antd";
import React, { useContext } from "react";
import DataTable from "react-data-table-component";
import "./tabla.css";

const TablaRequerimientos = ({ columns, table, set }) => {
  const handleChange = ({ selectedRows }) => {

    if(set !== undefined){

      set(selectedRows);
    }
  };

  const rowDisabledCriteria = (row) =>
    row.estado !== "Aprobado" ;

  const expandedComponent = ({ data }) => (
    <div style={{ padding: "10px 20px 10px 60px" }}>
      <div style={{ marginTop: "5px" }}>
        <label htmlFor="">
          <strong>Solicitante:</strong> {data?.solicitante}
        </label>
        <br />
        <label htmlFor="">
          <strong>Teléfono:</strong> {data?.celular}
        </label>

        <table style={{ marginTop: "20px" }}>
          <tr>
            <td style={{ width: "140px", textAlign: "center" }}>
              <strong>Fecha de pedido</strong>
            </td>
            <td style={{ width: "240px", textAlign: "center" }}>
              <strong>Producto</strong>
            </td>
            <td style={{ width: "180px", textAlign: "center" }}>
              <strong>Cantidad</strong>
            </td>
          </tr>
          {data?.requerimiento_productos?.map((item, i) => (
            <tr key={i}>
              <td style={{ textAlign: "center" }}>{data?.fecha_pedido}</td>
              <td style={{ textAlign: "center" }}>{item?.producto?.nombre}</td>
              <td style={{ textAlign: "center" }}>{item?.cantidad}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: false,
    selectAllRowsItemText: "Todos",
  };
  return (
    <div className="table-container">
      <DataTable
        columns={columns}
        data={table}
        pagination
        fixedHeader
        striped
        highlightOnHover
        selectableRows
        expandableRows
        expandableRowsComponent={expandedComponent}
        expandableRowDisabled={(row) => row?.completado === 1}
        paginationComponentOptions={paginationComponentOptions}
        responsive
        noHeader={true}
        noDataComponent={
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No hay registros para mostrar.</span>}
          />
        }
        onSelectedRowsChange={handleChange}
        selectableRowDisabled={rowDisabledCriteria}
      />
    </div>
  );
};

export default TablaRequerimientos;

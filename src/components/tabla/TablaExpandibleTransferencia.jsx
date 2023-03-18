import React from "react";
import DataTable from "react-data-table-component";

const TablaExpandibleTransferencia = ({ columns, table }) => {
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  const expandedComponent = ({ data }) => (
    <div style={{ padding: "10px 20px 10px 20px" }}>
      <label htmlFor="">
        <strong>Solicitante del pedido: </strong>
        {data.solicitante}
      </label>
      <br />
      <label htmlFor="">
        <strong>Código de requerimiento: </strong>
        {data.requerimiento_pedidos
          .map((item) => item.requerimiento_id)
          .toString()}
      </label>
      <br />
      <label htmlFor="">
        <strong>Fecha de pedido: </strong>
        {data.fecha}
      </label>

      <br />

      <table style={{ marginTop: "20px" }}>
        <tr>
          <td style={{ width: "240px", textAlign: "center" }}>
            <strong>Producto</strong>
          </td>
          <td style={{ width: "180px", textAlign: "center" }}>
            <strong>Cantidad</strong>
          </td>
        </tr>
        {data?.productos.map((dat, i) => (
          <tr key={i}>
            <td style={{ textAlign: "center" }}>{dat?.producto?.nombre}</td>
            <td style={{ textAlign: "center" }}>{dat?.cantidad}</td>
          </tr>
        ))}
      </table>
    </div>
  );
  return (
    <div className="table-container">
      <DataTable
        columns={columns}
        data={table}
        pagination
        fixedHeader
        striped
        highlightOnHover
        expandableRows
        expandableRowsComponent={expandedComponent}
        expandableRowDisabled={(row) =>
          row?.trabajador?.length === 0 ? true : false
        }
        paginationComponentOptions={paginationComponentOptions}
        responsive
        noHeader={true}
        noDataComponent={"No se encontraron resultados."}
      />
    </div>
  );
};

export default TablaExpandibleTransferencia;

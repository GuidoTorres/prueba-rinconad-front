import React from "react";
import DataTable from "react-data-table-component";
import "./tablaTransferencia.css";

const TablaTransferencia = ({ columns, table }) => {
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  const expandedComponent = ({ data }) => (
    <section style={{ padding: "10px 20px 10px 20px" }}>
      <div className="row-container">
        <table>
            <tr >
              <th >Producto</th>
              <th>Cantidad</th>
            </tr>
          {data.transferencia_productos.map((item) => (
            <tr>
              <td>{item.producto.nombre}</td>
              <td>{item.cantidad}</td>
            </tr>
          ))}
        </table>
      </div>
    </section>
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

export default TablaTransferencia;

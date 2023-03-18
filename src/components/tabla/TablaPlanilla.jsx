import React from "react";
import DataTable from "react-data-table-component";
import "./tabla.css";

const TablaPlanilla = ({ columns, table }) => {
  


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
        striped
        highlightOnHover
        responsive
        noDataComponent={"No se encontraron resultados."}
        paginationComponentOptions={paginationComponentOptions}
        paginationPerPage={8}
        paginationRowsPerPageOptions={[8, 16, 24, 32, 40]}
      />
    </div>
  );
};

export default TablaPlanilla;

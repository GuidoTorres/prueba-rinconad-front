import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { PlanillaContext } from "../../context/PlanillaContext";
import "./tabla.css";

const TablaUnirTeletrans = ({ columns, table }) => {

  const {multiplesTeletrans, setMultiplesTeletrans} = useContext(PlanillaContext)

  const handleChange = ({ selectedRows, }) => {
    setMultiplesTeletrans(selectedRows);
    console.log(selectedRows);
  };

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
        selectableRows
        onSelectedRowsChange={handleChange}
        // progressPending={"...cargando"}
        paginationComponentOptions={paginationComponentOptions}
      />
    </div>
  );
};

export default TablaUnirTeletrans;

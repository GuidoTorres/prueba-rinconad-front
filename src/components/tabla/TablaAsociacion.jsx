import React from "react";
import DataTable from "react-data-table-component";

const TablaAsociacion = ({ columns, table, filas }) => {
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: false,
    selectAllRowsItemText: "Todos",
  };

  const conditionalRowStyles = [
    {
      when: (row) => row?.contrato?.length > 0,
      style: {
        backgroundColor: "green",
        // color: 'white',
        // '&:hover': {
        //   cursor: 'pointer',
        // },
      },
    },
  ];

  return (
    <div className="table-container">
      <DataTable
        columns={columns}
        data={table}
        pagination
        striped
        highlightOnHover
        responsive
        paginationComponentOptions={paginationComponentOptions}
        paginationPerPage={filas || 8}
        paginationRowsPerPageOptions={[8, 16, 24, 32, 40]}
        conditionalRowStyles={conditionalRowStyles}
      />
    </div>
  );
};

export default TablaAsociacion;

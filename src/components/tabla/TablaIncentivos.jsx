import { Table } from "antd";
import React from "react";
import DataTable from "react-data-table-component";

import "./tabla.css";

const TablaIncentivos = ({ columns, table, filas }) => {
	const columnsExpandable = columns.map((item) => {
		return {
			title: item.name,
			dataIndex: item.id === "incentivo" ? "teletrans" : item.id,
			key: item.id === "incentivo" ? "teletrans" : item.id,
		};
	});

	const data = table.map((item) => {
		let disabled = false;
		if (item.trabajadores.length < 2) {
			disabled = true;
		}

		return {
			...item,
			disabled,
		};
	});

	const paginationComponentOptions = {
		rowsPerPageText: "Filas por página",
		rangeSeparatorText: "de",
		selectAllRowsItem: false,
		selectAllRowsItemText: "Todos",
	};

	const ExpandedComponent = ({ data }) => (
		<Table
			size="small"
			columns={columnsExpandable.filter(
				(item) =>
					item.key !== "fecha_pago" && item.key !== "observacion"
			)}
			dataSource={data.trabajadores.map((item, index) => {
				return {
					Nro: index + 1,
					incentivo: data.incentivo,
					nombres: item.nombre,
					teletrans: item.teletrans,
					...item,
				};
			})}
		/>
	);

	return (
		<div className="table-container">
			<DataTable
				size="small"
				columns={columns}
				data={data}
				pagination
				striped
				highlightOnHover
				responsive
				paginationComponentOptions={paginationComponentOptions}
				paginationPerPage={filas || 8}
				paginationRowsPerPageOptions={[8, 16, 24, 32, 40]}
				expandableRows
				expandableRowsComponent={ExpandedComponent}
				expandableRowDisabled={(row) => row.disabled}
			/>
		</div>
	);
};

export default TablaIncentivos;

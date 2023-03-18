import { Table } from "antd";
import React from "react";
import DataTable from "react-data-table-component";

import "./tabla.css";

const TablaPagosDiarios = ({ columns, table, filas }) => {
	const columnsExpandable = columns.map((item) => {
		return {
			title: item.name,
			dataIndex: item.id,
			key: item.id,
		};
	});

	const data = table.map((item) => {
		let disabled = false;
		if (item?.asociacion?.length < 2) {
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
					item.key !== "tipo" &&
					item.key !== "observacion" &&
					item.key !== "Acciones"
			)}
			dataSource={data.asociacion.map((item, index) => {
				return {
					Nro: index + 1,
					nombre: item.nombre,
					pago: item.teletrans,
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

export default TablaPagosDiarios;

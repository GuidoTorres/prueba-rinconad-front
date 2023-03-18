import { Card, Col, Row, Space, Table, Typography } from "antd";
import React from "react";
import DataTable from "react-data-table-component";
import { BiUserPin } from "react-icons/bi";
import { BsTruck } from "react-icons/bs";

import "./tabla.css";

const TablaPagoExtraordinario = ({ columns, table, filas }) => {
	const { Text } = Typography;
	const columnsGeneral = columns.filter(
		(item) =>
			item.id === "Nro" ||
			item.id === "fecha_pago" ||
			item.id === "observacion" ||
			item.id === "pago_id" ||
			item.id === "tipo" ||
			item.id === "teletrans" ||
			item.id === "volquetes" ||
			item.id === "estado" ||
			item.id === "Acciones"
	);

	const columnsExpandable = columns.map((item) => {
		return {
			title: item.name,
			dataIndex: item.id,
			key: item.id,
		};
	});

	const paginationComponentOptions = {
		rowsPerPageText: "Filas por página",
		rangeSeparatorText: "de",
		selectAllRowsItem: false,
		selectAllRowsItemText: "Todos",
	};

	const ExpandedComponent = ({ data }) => (
		<Row style={{ padding: 10 }} gutter={10} align="center">
			<Col lg={11} xs={24}>
				<Card
					title={
						<>
							<BsTruck /> Destino/s
						</>
					}
				>
					<Table
						style={{ width: "100%" }}
						size="small"
						pagination={false}
						columns={columnsExpandable.filter(
							(item) =>
								item.key === "hora" ||
								item.key === "placa" ||
								item.key === "propietario" ||
								item.key === "trapiche" ||
								item.key === "teletrans"
						)}
						dataSource={data.pago.destino_pagos.map(
							(item, index) => {
								return {
									Nro: index + 1,
									hora: item.destino.hora,
									placa: item.destino.placa,
									propietario: item.destino.propietario,
									trapiche: item.destino.trapiche,
									teletrans: item.destino.teletrans,
								};
							}
						)}
					/>
				</Card>
			</Col>
			<Col lg={11} xs={24}>
				<Card
					title={
						<>
							<BiUserPin />
							Trabajador
						</>
					}
				>
					<Row justify="space-between">
						<Col span={12}>
							<Space direction="horizontal">
								<Text strong>Nombre:</Text>
								<Text>
									{data?.trabajador?.nombre}{" "}
									{data?.trabajador?.apellido_paterno}{" "}
									{data?.trabajador?.apellido_materno}
								</Text>
							</Space>
						</Col>
						<Col span={12}>
							<Space direction="horizontal">
								<Text strong>Dni:</Text>
								<Text>{data?.trabajador?.dni}</Text>
							</Space>
						</Col>
						<Col span={12}>
							<Space direction="horizontal">
								<Text strong>Celular:</Text>
								<Text>{data?.trabajador?.telefono}</Text>
							</Space>
						</Col>
						<Col span={12}>
							<Space direction="horizontal">
								<Text strong>Email:</Text>
								<Text>{data?.trabajador?.email}</Text>
							</Space>
						</Col>
					</Row>
				</Card>
			</Col>
		</Row>
	);

	return (
		<div className="table-container">
			<DataTable
				size="small"
				columns={columnsGeneral}
				data={table}
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

export default TablaPagoExtraordinario;

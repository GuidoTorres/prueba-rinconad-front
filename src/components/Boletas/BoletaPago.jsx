import { Document, Page, Text, View } from "@react-pdf/renderer";
import { Col, Row } from "antd";
import { Html } from "react-pdf-html";

function BoletaPago({ data }) {
	const html = `
  <html>
	<body>
		<style>
			.header {
				display: grid;
				width: 500px;
				align-items: center;
				grid-template-columns: 1fr 3fr 1fr;
				margin-bottom: 20px;
			}
			.header .logo {
				width: 50px;
				height: 50px;
			}
			.header .nombre {
				text-align: center;
			}
			.header .nombre .titulo {
				margin: 0;
				font-size: 20px;
				text-transform: uppercase;
				font-size: 10px;
			}
			.tabla .recibo {
				text-align: end;
				text-transform: uppercase;
				font-size: 10px;
				font-weight: bold;
				margin-bottom: 10px;
				font-size: 15px;
			}
			.tabla .tabla-general {
				width: 500px;
				border: 1px solid;
				border-collapse: collapse;
			}
			.celda-firma {
				height: 50px;
			}
			.firma {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr;
				width: 100%;
				height: 100%;
			}
			.firma-1 {
				display: grid;
				align-items: end;
				justify-content: center;
				width: 100%;
				height: 100%;
			}
			.firma-1-1 {
				border-top: 1px dashed;
				text-align: center;
				text-transform: uppercase;
				font-size: 10px;
				font-weight: bold;
			}
		</style>
		<div>
			<div class="header">
				<div class="logo"></div>
				<div class="nombre">
					<h1 class="titulo">Unidad de producción</h1>
					<h1 class="titulo">"Central ana marias"</h1>
				</div>
			</div>
			<div class="tabla">
				<div class="recibo">recibo de pago</div>
				<table class="tabla-general">
					<tr
						class="tabla-row"
						style="border: 1px solid"
						style="border: 1px solid"
					>
						<th
							class="table-head"
							style="
								border: 1px solid;
								text-transform: uppercase;
								font-size: 10px;
							"
						>
							N°
						</th>
						<th
							class="table-head"
							style="
								border: 1px solid;
								text-transform: uppercase;
								font-size: 10px;
							"
						>
							Fecha
						</th>
						<th colspan="2">
							<table class="tabla-tipo" style="width: 100%">
								<tr class="tabla-row" style="border: none">
									<th
										class="table-head"
										style="
											text-transform: uppercase;
											font-size: 10px;
										"
										colspan="2"
									>
										Tipo de transporte
									</th>
								</tr>
								<tr class="tabla-row" style="border: 1px solid">
									<th
										class="table-head"
										style="
											border: 1px solid;
											text-transform: uppercase;
											font-size: 10px;
										"
									>
										volquete
									</th>
									<th
										class="table-head"
										style="
											border: 1px solid;
											text-transform: uppercase;
											font-size: 10px;
										"
									>
										teletran
									</th>
								</tr>
							</table>
						</th>
						<th
							class="table-head"
							style="
								border: 1px solid;
								text-transform: uppercase;
								font-size: 10px;
							"
						>
							Cantera
						</th>
						<th
							class="table-head"
							style="
								border: 1px solid;
								text-transform: uppercase;
								font-size: 10px;
							"
						>
							Hora Salida
						</th>
						<th
							class="table-head"
							style="
								border: 1px solid;
								text-transform: uppercase;
								font-size: 10px;
							"
						>
							Nombre del conductor o placa
						</th>
					</tr>
					<tr class="tabla-row" style="border: 1px solid">
						<td
							class="table-cell"
							style="border: 1px solid; padding: 5px"
						></td>
						<td
							class="table-cell"
							style="border: 1px solid; padding: 5px"
						></td>
						<td
							class="table-cell"
							style="border: 1px solid; padding: 5px"
						></td>
						<td
							class="table-cell"
							style="border: 1px solid; padding: 5px"
						></td>
						<td
							class="table-cell"
							style="border: 1px solid; padding: 5px"
						></td>
						<td
							class="table-cell"
							style="border: 1px solid; padding: 5px"
						></td>
						<td
							class="table-cell"
							style="border: 1px solid; padding: 5px"
						></td>
					</tr>
					<tr class="tabla-row" style="border: 1px solid">
						<td
							class="table-cell"
							style="border: 1px solid; padding: 5px"
						></td>
						<td
							class="table-cell"
							style="border: 1px solid; padding: 5px"
						></td>
						<td
							class="table-cell"
							style="border: 1px solid; padding: 5px"
						></td>
						<td
							class="table-cell"
							style="border: 1px solid; padding: 5px"
						></td>
						<td
							class="table-cell"
							style="border: 1px solid; padding: 5px"
						></td>
						<td
							class="table-cell"
							style="border: 1px solid; padding: 5px"
						></td>
						<td
							class="table-cell"
							style="border: 1px solid; padding: 5px"
						></td>
					</tr>
					<tr class="tabla-row" style="border: 1px solid">
						<td
							colspan="7"
							class="table-cell"
							style="border: 1px solid; padding: 5px"
						></td>
					</tr>
					<tr class="tabla-row" style="border: 1px solid">
						<td
							colspan="7"
							class="table-cell"
							style="border: 1px solid; padding: 5px"
						></td>
					</tr>
					<tr class="tabla-row" style="border: 1px solid">
						<td
							colspan="7"
							class="table-cell"
							style="border: 1px solid; padding: 5px"
						></td>
					</tr>
					<tr class="tabla-row" style="border: 1px solid">
						<td
							colspan="7"
							class="table-cell"
							style="border: 1px solid; padding: 5px"
						></td>
					</tr>
					<tr class="tabla-row" style="border: 1px solid">
						<td
							colspan="7"
							class="table-cell"
							style="border: 1px solid; padding: 5px"
						></td>
					</tr>
					<tr class="tabla-row" style="border: 1px solid">
						<td
							colspan="7"
							class="table-cell"
							style="border: 1px solid; padding: 5px"
						></td>
					</tr>
					<tr class="tabla-row" style="border: 1px solid">
						<td colspan="7" class="celda-firma">
							<div class="firma">
								<div class="firma-1">
									<div class="firma-1-1">
										JEFE DE CONTROL Y PAGO
									</div>
								</div>
							</div>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</body>
</html>

`;

	return (
		<Document>
			<Page size="A4">
				<View
					style={{
						padding: 20,
						display: "grid",
						gridTemplateColumns: "1fr 3fr 1fr",
						justifyContent: "space-around",
						alignItems: "center",
					}}
				>
					<View style={{}}>
						<Text style={{ fontSize: 10, fontWeight: "bold" }}>
							Logo
						</Text>
						<Text style={{ fontSize: 10 }}>-</Text>
					</View>
					<View style={{ flexDirection: "column" }}>
						<Text style={{ fontSize: 20, fontWeight: "bold" }}>
							UNIDAD DE PRODUCCIÓN
						</Text>
						<Text style={{ fontSize: 20, fontWeight: "bold" }}>
							"CENTRAL ANA MARÍAS"
						</Text>
					</View>
				</View>
				<View
					style={{
						width: "100%",
						flexDirection: "row",
						justifyContent: "end",
					}}
				>
					<View style={{ flexDirection: "row" }}>
						<Text style={{ fontSize: 10, fontWeight: "bold" }}>
							RECIBO DE PAGO
						</Text>
					</View>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						padding: 20,
					}}
				>
					<View style={{ border: 1 }}>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								padding: 5,
							}}
						>
							<View style={{ border: 1 }}>
								<Text
									style={{ fontSize: 10, fontWeight: "bold" }}
								>
									N°
								</Text>
							</View>
							<View style={{ border: 1 }}>
								<Text
									style={{ fontSize: 10, fontWeight: "bold" }}
								>
									FECHA
								</Text>
							</View>
							<View style={{ border: 1 }}>
								<View style={{ flexDirection: "column" }}>
									<Text
										style={{
											fontSize: 10,
											fontWeight: "bold",
										}}
									>
										TIPO DE TRANSPORTE
									</Text>
									<View style={{ flexDirection: "row" }}>
										<Text
											style={{
												fontSize: 10,
												fontWeight: "bold",
											}}
										>
											VOLQUETE
										</Text>
										<Text
											style={{
												fontSize: 10,
												fontWeight: "bold",
											}}
										>
											TELETRAN
										</Text>
									</View>
								</View>
							</View>
						</View>
					</View>
				</View>
			</Page>
		</Document>
	);
}
export default BoletaPago;

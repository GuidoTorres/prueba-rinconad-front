import React, { useContext, Suspense, lazy, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Outlet,
	Navigate,
	useNavigate,
} from "react-router-dom";
import { ProtectedRoute } from "../components/routes/ProtectedRoutes";
import { CrudContext } from "../context/CrudContext";
import AdministracionLayout from "../components/administracion/AdministracionLayout";
import CampamentoLayout from "../components/administracion/campamentos/CampamentoLayout";
import RolLayout from "../components/administracion/roles/RolLayout";
import UsuarioLayout from "../components/administracion/usuarios/UsuarioLayout";
import AsociacionLayout from "../components/personal/asociaciones/AsociacionLayout";
import EmpresaLayout from "../components/personal/empresas/EmpresaLayout";
import PersonalLayout from "../components/personal/trabajadores/PersonalLayout";
import PersonalTipoLayout from "../components/personal/PersonalTipoLayout";
import Sidebar from "../components/sidebar/Sidebar";
import IndexLayout from "../components/planillas/IndexLayout";
import ControlPlanilla from "../components/planillas/control/ControlPlanilla";
import ListaAsistencia from "../components/planillas/asistencia/ListaAsistencia";
import SocioLayout from "../components/personal/socios/SocioLayout";
import Finanzas from "../components/finanzas/ingresosEgresos/FinanzasLayout";
import MainLayoutInventario from "../components/logistica/MainLayout";
import Proveedores from "../components/finanzas/proveedor/Proveedores";
import Sucursales from "../components/finanzas/sucursal/Sucursales";
import InventarioLayout from "../components/logistica/inventario/InventarioLayout";
import AlmacenLayout from "../components/logistica/almacen/AlmacenLayout";
import RequerimientoLayout from "../components/logistica/requerimientos/RequerimientoLayout";
import AprobacionLayout from "../components/logistica/aprobaciones/AprobacionLayout";
import TransferenciaLayout from "../components/logistica/transferencia/TransferenciaLayout";
import CategoriaLayout from "../components/logistica/categorias/CategoriaLayout";
import EstadisticasLayout from "../components/logistica/estadisticas/EstadisticasLayout";
// import Login from "../components/login/Login";
import Error from "../components/404/Error";
import Layout from "./Layout";
import Denegado from "../components/denegado/Denegado";
import MainLayoutFinanzas from "../components/finanzas/MainLayoutFinanzas";
import Cargando from "../components/cargando/Cargando";
import PagosLayout from "../components/planillas/pagos/PagosLayout";
import "./styles/mainPage.css";
import Trapiche from "../components/personal/trapiche/Trapiche";
import Volquete from "../components/personal/volquete/Volquete";
import GenerarPago from "../components/planillas/realizar-pago/GenerarPago";
import Incentivos from "../components/planillas/incentivos/Incentivos";
import Casa from "../components/planillas/casa/Casa";
import HistorialPagos from "../components/planillas/historial-pago/HistorialPagos";
import VisualizadorPdf from "../components/planillas/realizar-pago/VisualizadorPdf";
// const AdministracionLayout = lazy(() => import("../components/administracion/AdministracionLayout"))
// const CampamentoLayout = lazy(() => import("../components/administracion/campamentos/CampamentoLayout"))
// const RolLayout = lazy(() => import("../components/administracion/roles/RolLayout"))
// const UsuarioLayout = lazy(() => import("../components/administracion/usuarios/UsuarioLayout"))
// const AsociacionLayout = lazy(() => import("../components/personal/asociaciones/AsociacionLayout"))
// const EmpresaLayout = lazy(() => import("../components/personal/empresas/EmpresaLayout"))
// const PersonalLayout = lazy(() => import("../components/personal/trabajadores/PersonalLayout"))
// const PersonalTipoLayout = lazy(() => import("../components/personal/PersonalTipoLayout"))
// const Sidebar = lazy(() => import("../components/sidebar/Sidebar"))
// const IndexLayout = lazy(() => import("../components/planillas/IndexLayout"))
// const ControlPlanilla = lazy(() => import("../components/planillas/control/ControlPlanilla"))
// const ListaAsistencia = lazy(() => import("../components/planillas/asistencia/ListaAsistencia"))
// const SocioLayout = lazy(() => import("../components/personal/socios/SocioLayout"))
// const Finanzas = lazy(() => import("../components/Finanzas/ingresos-egresos/FinanzasLayout"))
// const MainLayoutInventario = lazy(() => import("../components/logistica/MainLayout"))
// const Proveedores = lazy(() => import("../components/Finanzas/proveedor/Proveedores"))
// const Sucursales = lazy(() => import("../components/Finanzas/sucursal/Sucursales"))
// const InventarioLayout = lazy(() => import("../components/logistica/inventario/InventarioLayout"))
// const AlmacenLayout = lazy(() => import("../components/logistica/almacen/AlmacenLayout"))
// const RequerimientoLayout = lazy(() => import("../components/logistica/requerimientos/RequerimientoLayout"))
// const AprobacionLayout = lazy(() => import("../components/logistica/aprobaciones/AprobacionLayout"))
// const CategoriaLayout = lazy(() => import("../components/logistica/categorias/CategoriaLayout"))
// const TransferenciaLayout = lazy(() => import("../components/logistica/transferencia/TransferenciaLayout"))
// const EstadisticasLayout = lazy(() => import("../components/logistica/estadisticas/EstadisticasLayout"))
const Login = lazy(() => import("../components/login/Login"));
// const Error = lazy(() => import("../components/404/Error"))
// const Layout = lazy(() => import("./Layout"))
// const Denegado = lazy(() => import("../components/denegado/Denegado"))
// const MainLayoutFinanzas = lazy(() => import("../components/finanzas/MainLayoutFinanzas"))

const MainPage = () => {
	const navigate = useNavigate();
	const { sidebar, user, permisos } = useContext(CrudContext);

	let permiso;

	useEffect(() => {
		permiso = JSON.parse(localStorage.getItem("permisos"));
		if (localStorage.getItem("permisos") === null) {
			navigate("/");
		}
	}, []);

	return (
		<>
			{localStorage.getItem("user") && (
				<div
					className={sidebar ? "responsive-active" : "main-container"}
				>
					<section className="sidebar">
						<Sidebar />
					</section>
					<section className="main">
						<Routes>
							<Route path="/" element={<Layout />}>
								<Route path="administracion">
									<Route
										index
										element={<AdministracionLayout />}
									/>
									<Route
										path="usuarios"
										element={
											<ProtectedRoute
												role={
													JSON.parse(
														localStorage.getItem(
															"permisos"
														)
													).administracion_usuario
												}
											>
												<UsuarioLayout />
											</ProtectedRoute>
										}
									/>
									<Route
										path="roles"
										element={
											<ProtectedRoute
												role={
													JSON.parse(
														localStorage.getItem(
															"permisos"
														)
													).administracion_rol
												}
											>
												<RolLayout />
											</ProtectedRoute>
										}
									/>
									<Route
										path="campamentos"
										element={
											<ProtectedRoute
												role={
													JSON.parse(
														localStorage.getItem(
															"permisos"
														)
													).administracion_campamento
												}
											>
												<CampamentoLayout />
											</ProtectedRoute>
										}
									/>
								</Route>
								<Route path="personal">
									<Route
										index
										element={<PersonalTipoLayout />}
									/>
									<Route
										path="trabajador"
										element={
											<ProtectedRoute
												role={
													JSON.parse(
														localStorage.getItem(
															"permisos"
														)
													).personal_trabajador
												}
											>
												<PersonalLayout />
											</ProtectedRoute>
										}
									/>
									<Route
										path="asociacion"
										element={
											<ProtectedRoute
												role={
													JSON.parse(
														localStorage.getItem(
															"permisos"
														)
													).personal_grupal
												}
											>
												<AsociacionLayout />
											</ProtectedRoute>
										}
									/>
									<Route
										path="empresa"
										element={
											<ProtectedRoute
												role={
													JSON.parse(
														localStorage.getItem(
															"permisos"
														)
													).personal_empresa
												}
											>
												<EmpresaLayout />
											</ProtectedRoute>
										}
									/>
									<Route
										path="socio"
										element={
											<ProtectedRoute
												role={
													JSON.parse(
														localStorage.getItem(
															"permisos"
														)
													).personal_socio
												}
											>
												<SocioLayout />
											</ProtectedRoute>
										}
									/>
									<Route
										path="trapiche"
										element={<Trapiche />}
									/>
									<Route
										path="volquete"
										element={<Volquete />}
									/>
								</Route>
								<Route path="planilla">
									<Route index element={<IndexLayout />} />
									<Route
										path="asistencia"
										element={
											<ProtectedRoute
												role={
													JSON.parse(
														localStorage.getItem(
															"permisos"
														)
													).planillas_asistencia
												}
											>
												<ListaAsistencia />
											</ProtectedRoute>
										}
									/>
									<Route
										path="control"
										element={
											<ProtectedRoute
												role={
													JSON.parse(
														localStorage.getItem(
															"permisos"
														)
													).planillas_control
												}
											>
												<ControlPlanilla />
											</ProtectedRoute>
										}
									/>
									<Route
										path="pagos"
										element={
											<ProtectedRoute
												role={
													JSON.parse(
														localStorage.getItem(
															"permisos"
														)
													).planillas_control
												}
											>
												<PagosLayout />
											</ProtectedRoute>
										}
									/>
									<Route
										path="pagos/generar"
										element={<GenerarPago />}
									/>
									<Route
										path="pagos/incentivos"
										element={<Incentivos />}
									/>
									<Route
										path="pagos/casa"
										element={<Casa />}
									/>
									<Route
										path="pagos/historial"
										element={<HistorialPagos />}
									/>
									<Route
										path="pagos/imprimir"
										element={<VisualizadorPdf />}
									/>
								</Route>
								<Route path="finanzas">
									<Route
										index
										element={<MainLayoutFinanzas />}
									/>
									<Route
										path="saldo"
										element={
											<ProtectedRoute
												role={
													JSON.parse(
														localStorage.getItem(
															"permisos"
														)
													).finanzas_ingreso
												}
											>
												<Finanzas />
											</ProtectedRoute>
										}
									/>
									<Route
										path="proveedor"
										element={
											<ProtectedRoute
												role={
													JSON.parse(
														localStorage.getItem(
															"permisos"
														)
													).finanzas_proveedor
												}
											>
												<Proveedores />
											</ProtectedRoute>
										}
									/>
									<Route
										path="sucursal"
										element={
											<ProtectedRoute
												role={
													JSON.parse(
														localStorage.getItem(
															"permisos"
														)
													).finanzas_sucursal
												}
											>
												<Sucursales />
											</ProtectedRoute>
										}
									/>
								</Route>
								<Route path="logistica">
									<Route
										index
										element={<MainLayoutInventario />}
									/>
									<Route
										path="inventario"
										element={
											<ProtectedRoute
												role={
													JSON.parse(
														localStorage.getItem(
															"permisos"
														)
													).logistica_inventario
												}
											>
												<InventarioLayout />
											</ProtectedRoute>
										}
									/>
									<Route
										path="almacen"
										element={
											<ProtectedRoute
												role={
													JSON.parse(
														localStorage.getItem(
															"permisos"
														)
													).logistica_almacen
												}
											>
												<AlmacenLayout />
											</ProtectedRoute>
										}
									/>
									<Route
										path="sucursal"
										element={<Sucursales />}
									/>
									<Route
										path="requerimiento"
										element={
											<ProtectedRoute
												role={
													JSON.parse(
														localStorage.getItem(
															"permisos"
														)
													).logistica_requerimiento
												}
											>
												<RequerimientoLayout />
											</ProtectedRoute>
										}
									/>
									<Route
										path="aprobacion"
										element={
											<ProtectedRoute
												role={
													JSON.parse(
														localStorage.getItem(
															"permisos"
														)
													).logistica_aprobacion
												}
											>
												<AprobacionLayout />
											</ProtectedRoute>
										}
									/>
									<Route
										path="transferencia"
										element={
											<ProtectedRoute
												role={
													JSON.parse(
														localStorage.getItem(
															"permisos"
														)
													).logistica_transferencia
												}
											>
												<TransferenciaLayout />
											</ProtectedRoute>
										}
									/>
									<Route
										path="categoria"
										element={
											<ProtectedRoute
												role={
													JSON.parse(
														localStorage.getItem(
															"permisos"
														)
													).logistica_categoria
												}
											>
												<CategoriaLayout />
											</ProtectedRoute>
										}
									/>
									<Route
										path="estadistica"
										element={
											<ProtectedRoute
												role={
													JSON.parse(
														localStorage.getItem(
															"permisos"
														)
													).logistica_estadistica
												}
											>
												<EstadisticasLayout />
											</ProtectedRoute>
										}
									/>
								</Route>
							</Route>

							<Route path="denegado" element={<Denegado />} />
							<Route path="*" element={<Error />} />
						</Routes>
					</section>
				</div>
			)}
			{!localStorage.getItem("user") && (
				<Suspense fallback={<Cargando />}>
					<Routes>
						<Route path="/" element={<Login />} />
					</Routes>
				</Suspense>
			)}
		</>
	);
};

export default MainPage;

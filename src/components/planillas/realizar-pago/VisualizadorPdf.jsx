import { PDFViewer } from "@react-pdf/renderer";
import BoletaPago from "../../Boletas/BoletaPago";

function VisualizadorPdf({ data = {} }) {
	return (
		<PDFViewer style={{ width: "100%", height: "99vh" }}>
			<BoletaPago data={data} style={{ width: "100%" }} />
		</PDFViewer>
	);
}
export default VisualizadorPdf;

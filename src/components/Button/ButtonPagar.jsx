import { Button } from "antd";

function ButtonPagar({ onClick }) {
	return (
		<Button
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
			type="primary"
			onClick={onClick}
		>
			Pagar
		</Button>
	);
}
export default ButtonPagar;

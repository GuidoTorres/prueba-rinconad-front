import { Button } from "antd";

function ButtonReprogramar({ onClick, disabled }) {
	return (
		<Button type="primary" onClick={onClick} disabled={disabled}>
			Reprogramar
		</Button>
	);
}
export default ButtonReprogramar;

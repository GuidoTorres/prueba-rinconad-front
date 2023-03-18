import { Button, Tooltip } from "antd";
import { BsCheckLg } from "react-icons/bs";

function ButtonValidate({ onClick }) {
	return (
		<Tooltip title="Validar">
			<Button type="text" onClick={onClick}>
				<BsCheckLg />
			</Button>
		</Tooltip>
	);
}
export default ButtonValidate;

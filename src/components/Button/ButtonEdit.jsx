import { Button, Tooltip } from "antd";
import { BsPencil } from "react-icons/bs";

function ButtonEdit({ onClick }) {
	return (
		<Tooltip placement="top" title="Editar">
			<Button
				type="text"
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
				icon={<BsPencil style={{ fontSize: "20px" }} />}
				onClick={onClick}
			/>
		</Tooltip>
	);
}
export default ButtonEdit;

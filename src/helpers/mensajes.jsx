import { notification } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export const notificacion = (status, text) => {
  if (status === 200) {
    return notification.success({
      message: text,
      duration: 3,
      icon: (
        <CheckCircleOutlined
          style={{
            color: "#079434",
          }}
        />
      ),
    });
  }

  if (status !== 200) {
    return notification.error({
      message: text,
      duration: 3,
      icon: (
        <CloseCircleOutlined
          style={{
            color: "#e92910",
          }}
        />
      ),
    });
  }
};

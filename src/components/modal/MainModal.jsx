import React from "react";
import { Modal } from "antd";

const MainModal = ({ className, title, open, width, closeModal, children }) => {
  return (
    <Modal
      destroyOnClose={true}
      className={className}
      title={title}
      open={open}
      centered
      onCancel={closeModal}
      footer={null}
      width={width}
    >
      {children}
    </Modal>
  );
};

export default MainModal;

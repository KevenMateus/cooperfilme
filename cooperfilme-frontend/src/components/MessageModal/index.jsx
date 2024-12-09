import React from "react";
import styles from "./styles";

const MessageModal = ({ isOpen, message, onClose, type = "info" }) => {
  if (!isOpen) return null;

  const getTypeStyle = () => {
    switch (type) {
      case "error":
        return styles.error;
      case "success":
        return styles.success;
      case "warning":
        return styles.warning;
      default:
        return styles.info;
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.modal, ...getTypeStyle() }}>
        <p>{message}</p>
        <button style={styles.closeButton} onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default MessageModal;

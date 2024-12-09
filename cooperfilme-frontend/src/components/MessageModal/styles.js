const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modal: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      padding: "20px",
      minWidth: "300px",
      textAlign: "center",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    closeButton: {
      marginTop: "15px",
      padding: "10px 15px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    success: { borderLeft: "5px solid #28a745" },
    error: { borderLeft: "5px solid #dc3545" },
    warning: { borderLeft: "5px solid #ffc107" },
    info: { borderLeft: "5px solid #17a2b8" },
  };
  
  export default styles;
  
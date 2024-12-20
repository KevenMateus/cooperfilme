const styles = {
  container: {
    padding: "20px",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #E6E6FA, #FAF3E0)",
    fontFamily: "Montserrat, sans-serif",
  },
  header: {
    color: "white",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    padding: "10px 20px",
    borderRadius: "8px",
    marginBottom: "20px",
    backgroundColor: "#6A5ACD",
    justifyContent: "space-between",
    fontFamily: "Montserrat, sans-serif",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
  },
  confirmationModal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    background: "linear-gradient(135deg, #E6E6FA, #FAF3E0)",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    zIndex: 10,
  },
  confirmButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#FF6347",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px",
  },
  logoutButton: {
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    padding: "10px 20px",
    backgroundColor: "#FF6347",
    transition: "background-color 0.3s ease",
  },
  main: {
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#E6E6FA",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  filters: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "20px",
    justifyContent: "space-between",
  },
  filterItem: {
    margin: "5px",
    display: "flex",
    flexDirection: "column",
    flex: "1 1 calc(25% - 10px)",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontFamily: "Montserrat, sans-serif",
  },
  button: {
    color: "white",
    border: "none",
    cursor: "pointer",
    padding: "10px 20px",
    borderRadius: "5px",
    alignSelf: "flex-end",
    backgroundColor: "#6A5ACD",
    transition: "background-color 0.3s ease",
    fontFamily: "Montserrat, sans-serif",
  },
  results: {
    marginTop: "20px",
  },
  table: {
    width: "100%",
    marginTop: "10px",
    borderCollapse: "collapse",
  },
  tableHeader: {
    color: "#6A5ACD",
    fontWeight: "bold",
    backgroundColor: "#6A5ACD",
  },
  tableRow: {
    backgroundColor: "#f2f2f2",
    "&:nth-child(even)": {
      backgroundColor: "#e6e6e6",
    },
  },
  tableCell: {
    color: "white",
    padding: "10px",
    textAlign: "center",
    border: "1px solid #ccc",
  },
  tableCellValues: {
    color: "black",
    padding: "10px",
    textAlign: "center",
    border: "1px solid #ccc",
  },
  actionsButton: {
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    padding: "5px 10px",
    backgroundColor: "#6A5ACD",
    transition: "background-color 0.3s ease",
    fontFamily: "Montserrat, sans-serif",
  },
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "linear-gradient(135deg, #E6E6FA, #6A5ACD)",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  actionsButtonHover: {
    backgroundColor: "#5A4DCD",
  },
  successMessage: {
    color: "#28a745",
    marginBottom: "20px",
  },
  justificativaModal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    background: "linear-gradient(135deg, #E6E6FA, #6A5ACD)",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    zIndex: 1000,
  },
  textarea: {
    width: "100%",
    height: "100px",
    margin: "10px 0",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  modalActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
  },
  votoButton: {
    backgroundColor: "#6A5ACD",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  votoIcon: {
    marginRight: "8px",
  },

  userProfile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  userInfo: { display: "flex", alignItems: "center" },
  userIcon: { width: "50px", height: "50px", marginRight: "10px" },
  logoutButton: {
    padding: "5px 10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
};

export default styles;

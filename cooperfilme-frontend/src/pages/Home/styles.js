const styles = {
  homeContainer: {
    padding: "20px",
    height: "100vh",
    background: "linear-gradient(135deg, #E6E6FA, #FAF3E0)",
    fontFamily: "Roboto, sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  loginContainer: {
    position: "relative",
  },
  loginButton: {
    color: "white",
    border: "none",
    cursor: "pointer",
    padding: "10px 20px",
    backgroundColor: "#6A5ACD",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  },
  loginButtonHover: {
    backgroundColor: "#2F4F4F",
  },
  loginForm: {
    top: "40px",
    right: "0",
    padding: "20px",
    borderRadius: "5px",
    position: "absolute",
    border: "1px solid #ccc",
    backgroundColor: "#6A5ACD",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  loginFormInput: {
    width: "200px",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
    border: "1px solid #ccc",
  },
  loginFormButton: {
    width: "100%",
    padding: "10px",
    color: "white",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#3CB371",
    transition: "background-color 0.3s ease",
  },
  loginFormButtonHover: {
    backgroundColor: "#6B8E23",
  },
  mainContent: {
    zIndex: 1,
    display: "flex",
    marginTop: "50px",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  mainContentH1: {
    color: "#333",
    fontSize: "2.5em",
    fontFamily: "Georgia, serif",
  },
  mainContentP: {
    color: "#555",
    fontSize: "1.2em",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  sendButton: {
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "1.1em",
    borderRadius: "5px",
    padding: "15px 30px",
    backgroundColor: "#6A5ACD",
  },
  sendButtonHover: {
    backgroundColor: "#0b7dda",
  },
  statusButton: {
    padding: "15px 30px",
    backgroundColor: "#2196F3",
    color: "white",
    fontSize: "1.1em",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default styles;

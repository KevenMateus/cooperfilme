import { useState } from "react";

const VotacaoModal = ({ isOpen, onClose, onSubmit }) => {
  const [voto, setVoto] = useState('APROVAR');

  const handleVotoChange = (event) => {
    setVoto(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(voto);
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>Votação</h2>
        <form onSubmit={handleFormSubmit}>
          <label style={styles.label}>
            Defina seu Voto
            <select
              value={voto}
              onChange={handleVotoChange}
              style={styles.input}
            >
              <option  value="APROVAR" style={styles.input}>Aprovar</option>
              <option value="RECUSAR" style={styles.input}>Recusar</option>
            </select>
          </label>
          <div style={styles.buttons}>
            <button type="button" onClick={onClose} style={styles.cancelButton}>
              Cancelar
            </button>
            <button type="submit" style={styles.submitButton}>
              Enviar Voto
            </button>
          </div>
        </form>
      </div>
    </div>
  );  
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    background: "linear-gradient(135deg, #E6E6FA, #6A5ACD)",
    padding: "20px",
    borderRadius: "8px",
    minWidth: "300px",
    textAlign: "center",
  },
  input: {
    padding: "8px",
    marginBottom: "12px",
    borderRadius: "4px",
    width: "100%",
    border: "1px solid #ccc",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  submitButton: {
    backgroundColor: "#6A5ACD",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default VotacaoModal;

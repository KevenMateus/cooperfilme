import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarRoteirosStatus } from "../../../services/roteiroService";
import { FaDownload } from "react-icons/fa";
import styles from "./styles";

const getStatusColor = (statusCode) => {
  switch (statusCode) {
    case 1:
      return { text: "Aguardando Análise", color: "#FF6347" };
    case 2:
      return { text: "Em Análise", color: "#FFD700" };
    case 3:
      return { text: "Aguardando Revisão", color: "#00BFFF" };
    case 4:
      return { text: "Em Revisão", color: "#1E90FF" };
    case 5:
      return { text: "Aguardando Aprovação", color: "#32CD32" };
    case 6:
      return { text: "Em Aprovação", color: "#00FA9A" };
    case 7:
      return { text: "Aprovado", color: "#228B22" };
    case 8:
      return { text: "Recusado", color: "#B22222" };
    default:
      return { text: "Status Desconhecido", color: "#808080" };
  }
};

const ConsultarStatus = () => {
  const [email, setEmail] = useState("");
  const [filteredRoteiros, setFilteredRoteiros] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = filteredRoteiros.filter((roteiro) =>
      roteiro.email.toLowerCase().includes(email.toLowerCase())
    );

    if (result.length > 0) {
      setFilteredRoteiros(result);
      setMensagem("");
    } else {
      setMensagem("Nenhum roteiro encontrado para este autor.");
      setFilteredRoteiros([]);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const handleDownload = (texto, nomeCliente) => {
    const content = texto;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Roteiro-${nomeCliente}.txt`;
    link.click();
  };

  const handleBuscarStatus = async () => {
    setIsLoading(true);
    try {
      const fetchedRoteiros = await buscarRoteirosStatus(email);
      setFilteredRoteiros(fetchedRoteiros);
      setMensagem("");
    } catch (error) {
      setMensagem("Erro ao buscar os roteiros.");
      setFilteredRoteiros([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <span></span>
        <button onClick={() => navigate("/")} style={styles.logoutButton}>
          Voltar para Home
        </button>
      </header>

      <main style={styles.main}>
        <h1>Consultar Status do Roteiro</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.filterItem}>
            <label style={styles.label}>E-mail do Autor:</label>
            <input
              type="email"
              placeholder="Digite o e-mail do autor"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button
            onClick={handleBuscarStatus}
            style={styles.button}
            disabled={isLoading}
          >
            {isLoading ? "Buscando..." : "Consultar"}
          </button>
        </form>

        {mensagem && <div style={styles.errorMessage}>{mensagem}</div>}

        {filteredRoteiros.length > 0 && (
          <div style={styles.results}>
            <h2>Resultados</h2>
            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th style={styles.tableCell}>Nome do Autor</th>
                  <th style={styles.tableCell}>Data de Envio</th>
                  <th style={styles.tableCell}>Status</th>
                  <th style={styles.tableCell}>Roteiro</th>
                  <th style={styles.tableCell}>Justificativa</th>
                  <th style={styles.tableCell}>Observação</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoteiros.map((roteiro) => {
                  const { text, color } = getStatusColor(roteiro.status);
                  return (
                    <tr key={roteiro.id} style={styles.tableRow}>
                      <td style={styles.tableCellValues}>
                        {roteiro.nomeCliente}
                      </td>
                      <td style={styles.tableCellValues}>
                      {formatDate(roteiro.dataEnvio)}
                      </td>
                      <td
                        style={{
                          ...styles.tableCellValues,
                          backgroundColor: color || "transparent",
                        }}
                      >
                        {text.charAt(0).toUpperCase() +
                          text.slice(1).replace("_", " ")}
                      </td>
                      <td style={styles.tableCellValues}>
                        <button
                          style={styles.actionsButton}
                          onClick={() =>
                            handleDownload(
                              roteiro.texto,
                              roteiro.nomeCliente
                            )
                          }
                        >
                          <FaDownload />
                        </button>
                      </td>
                      <td style={styles.tableCellValues}>
                      {roteiro.justificativa}
                    </td>
                    <td style={styles.tableCellValues}>
                      {roteiro.observacao}
                    </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default ConsultarStatus;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaDownload, FaArrowRight, FaThumbsUp } from "react-icons/fa";
import MessageModal from "../../components/MessageModal";
import VotacaoModal from "../../components/VotacaoModal";
import {
  buscarRoteiros,
  atualizarStatusRoteiro,
} from "../../services/roteiroService";
import { getUserInfo } from "../../services/usuarioService";

import { votar } from "../../services/votoService";
import styles from "./styles";

const statusTransitions = {
  1: [2],
  2: [3, 8],
  3: [4],
  4: [5],
  5: [6, 8],
  6: [7, 8],
  7: [],
  8: [],
};

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

const Dashboard = () => {
  const navigate = useNavigate();
  const [voto, setVoto] = useState("");
  const [cargo, setCargo] = useState(null);
  const [roteiros, setRoteiros] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [filtroNome, setFiltroNome] = useState("");
  const [observacao, setObservacao] = useState("");
  const [totalVotos, setTotalVotos] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState("");
  const [justificativa, setJustificativa] = useState("");
  const [selectStatus, setSelectStatus] = useState(null);
  const [filtroDataFim, setFiltroDataFim] = useState("");
  const [currentStatus, setCurrentStatus] = useState(null);
  const [filtroDataInicio, setFiltroDataInicio] = useState("");
  const [selectedRoteiro, setSelectedRoteiro] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedRoteiroId, setSelectedRoteiroId] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [isVotacaoModalOpen, setIsVotacaoModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const userInfo = getUserInfo();
    if (!userInfo) {
      navigate("/");
    } else {
      setUsuario(userInfo);
      setCargo(userInfo.cargo);
    }
  }, [navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const verificarPermissao = (cargo, statusAtual) => {
    const permissoes = {
      ANALISTA: [1, 2, 8],
      REVISOR: [3, 4],
      APROVADOR: [5, 6, 7, 8],
    };

    return permissoes[cargo]?.includes(statusAtual);
  };

  const exibirMensagem = (mensagem, tipo) => {
    setMessageText(mensagem);
    setMessageType(tipo);
    setIsMessageOpen(true);
  };

  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageType, setMessageType] = useState("info");

  const handleAlterarStatus = (id) => {
    const roteiro = roteiros.find((r) => r.id === id);
    const currentStatus = roteiro.status;

    if (!verificarPermissao(usuario.cargo, currentStatus)) {
      exibirMensagem(
        "Você não tem permissão para alterar este status.",
        "error"
      );
      return;
    }

    setCurrentStatus(currentStatus);

    setSelectedRoteiroId(id);

    const possibleStatuses = statusTransitions[currentStatus] || [];

    if (possibleStatuses.length === 0) {
      console.error(`Status "${currentStatus}" não tem transições possíveis.`);
      return;
    }

    if (possibleStatuses.length === 1) {
      setSelectStatus(possibleStatuses[0]);
      setShowConfirmation(true);
    } else {
      setSelectStatus(null);
      setShowConfirmation(true);
    }
  };

  const handleSelectStatus = (status) => {
    setSelectStatus(status);
  };

  const confirmAlterarStatus = async () => {
    if (selectStatus !== null && selectedRoteiroId !== null) {
      try {
        let dto = {
          novoStatus: selectStatus,
          justificativa: null,
          observacao: null,
        };
        if (selectStatus === 8) {
          dto.justificativa = justificativa;
        }
        if (selectStatus === 4) {
          dto.observacao = observacao;
        }

        const token = localStorage.getItem("token");
        await atualizarStatusRoteiro(selectedRoteiroId, dto, token);
        setRoteiros(
          roteiros.map((roteiro) =>
            roteiro.id === selectedRoteiroId
              ? { ...roteiro, status: selectStatus }
              : roteiro
          )
        );

        setMessageText("Status atualizado com sucesso!");
        setMessageType("success");
      } catch (error) {
        setMessageText("Erro ao atualizar o status. Tente novamente.");
        setMessageType("error");
        console.error("Erro ao atualizar o status:", error);
      } finally {
        setShowConfirmation(false);
        setShowApprovalModal(false);
        setSelectStatus(null);
        setIsMessageOpen(true);
        setCurrentStatus(null);
        setJustificativa("");
        setObservacao("");
      }
    }
  };

  const cancelAlterarStatus = () => {
    setShowConfirmation(false);
    setSelectStatus(null);
  };

  const handleDownload = (texto, nomeCliente) => {
    const content = texto;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Roteiro-${nomeCliente}.txt`;
    link.click();
  };

  const handleBuscar = async () => {
    setIsLoading(true);
    try {
      const dataInicioFormatada = filtroDataInicio
        ? `${filtroDataInicio}T00:00:00`
        : null;
      const dataFimFormatada = filtroDataFim
        ? `${filtroDataFim}T23:59:59`
        : null;

      const filtroStatusInt = parseInt(filtroStatus, 10) || null;
      const token = localStorage.getItem("token");
      const fetchedRoteiros = await buscarRoteiros(
        filtroNome,
        dataInicioFormatada,
        dataFimFormatada,
        filtroStatusInt,
        token
      );
      setRoteiros(fetchedRoteiros);
    } catch (error) {
      exibirMensagem("Erro ao buscar: Usuario não autenticado", "error");
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVotacaoButtonClick = (roteiroId) => {
    setSelectedRoteiro(roteiroId);
    setIsVotacaoModalOpen(true);
  };

  const fetchRoteirosAtualizados = async () => {
    const fetchedRoteiros = await buscarRoteiros(
      filtroNome,
      dataInicioFormatada,
      dataFimFormatada,
      filtroStatusInt,
      token
    );
    setRoteiros(fetchedRoteiros);
  };

  const handleVotoSubmit = async (voto) => {
    if (!voto) return;
    try {
      let votoRequestDto = {
        voto: voto,
        usuarioId: usuario.usuarioId,
      };
      const token = localStorage.getItem("token");
      const response = await votar(selectedRoteiro, votoRequestDto, token);

      await fetchRoteirosAtualizados();

      exibirMensagem("Voto registrado com sucesso!", "success");
      setIsVotacaoModalOpen(false);
    } catch (error) {
      exibirMensagem(`Erro ao registrar voto: Aprovador já votou nesse roteiro`);
      setMessageType("error");
      setIsVotacaoModalOpen(false);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <span>
          <b>Dashboard</b>
        </span>
        <button style={styles.logoutButton} onClick={() => navigate("/")}>
          Logout
        </button>
      </header>

      <main style={styles.main}>
        <div style={styles.filters}>
          <div style={styles.filterItem}>
            <label style={styles.label}>Nome:</label>
            <input
              style={styles.input}
              type="text"
              placeholder="Nome do autor"
              value={filtroNome}
              onChange={(e) => setFiltroNome(e.target.value)}
            />
          </div>
          <div style={styles.filterItem}>
            <label style={styles.label}>Data de Início:</label>
            <input
              style={styles.input}
              type="date"
              value={filtroDataInicio}
              onChange={(e) => setFiltroDataInicio(e.target.value)}
            />
          </div>
          <div style={styles.filterItem}>
            <label style={styles.label}>Data de Fim:</label>
            <input
              style={styles.input}
              type="date"
              value={filtroDataFim}
              onChange={(e) => setFiltroDataFim(e.target.value)}
            />
          </div>
          <div style={styles.filterItem}>
            <label style={styles.label}>Status:</label>
            <select
              style={styles.input}
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="1">Aguardando Análise</option>
              <option value="2">Em Análise</option>
              <option value="3">Aguardando Revisão</option>
              <option value="4">Em Revisão</option>
              <option value="5">Aguardando Aprovação</option>
              <option value="6">Em Aprovação</option>
              <option value="7">Aprovado</option>
              <option value="8">Recusado</option>
            </select>
          </div>
          <button onClick={handleBuscar} style={styles.button}>
            Buscar
          </button>
        </div>

        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableCell}>Nome do Cliente</th>
              <th style={styles.tableCell}>Data de Envio</th>
              <th style={styles.tableCell}>Status</th>
              <th style={styles.tableCell}>Roteiro</th>
              <th style={styles.tableCell}>Justificativa</th>
              <th style={styles.tableCell}>Observação</th>
              {cargo !== "APROVADOR" && (
                <th style={styles.tableCell}>Atualizar Status</th>
              )}
              {cargo === "APROVADOR" && <th style={styles.tableCell}>Votar</th>}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6">Carregando...</td>
              </tr>
            ) : (
              roteiros.map((roteiro) => {
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
                          handleDownload(roteiro.texto, roteiro.nomeCliente)
                        }
                      >
                        <FaDownload />
                      </button>
                    </td>
                    <td style={styles.tableCellValues}>
                      {roteiro.justificativa}
                    </td>
                    <td style={styles.tableCellValues}>{roteiro.observacao}</td>
                    {cargo !== "APROVADOR" && (
                      <td style={styles.tableCellValues}>
                        <button
                          style={styles.actionsButton}
                          onClick={() => handleAlterarStatus(roteiro.id)}
                          disabled={["aprovado", "recusado"].includes(
                            roteiro.status
                          )}
                        >
                          <FaArrowRight />
                        </button>
                      </td>
                    )}
                    {cargo === "APROVADOR" && (
                      <td style={styles.tableCellValues}>
                        <button
                          style={{
                            ...styles.votoButton,
                            backgroundColor: [1, 2, 3, 4, 7, 8].includes(
                              roteiro.status
                            )
                              ? "#cccccc"
                              : "#6A5ACD",
                            cursor: [1, 2, 3, 4, 7, 8].includes(roteiro.status)
                              ? "not-allowed"
                              : "pointer",
                          }}
                          onClick={() => handleVotacaoButtonClick(roteiro.id)}
                          disabled={[1, 2, 3, 4, 7, 8].includes(roteiro.status)}
                        >
                          <FaThumbsUp style={styles.votoIcon} />
                          Votar
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        {(showApprovalModal || showConfirmation) && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              {selectStatus === null && (
                <>
                  <p>Você deseja Aprovar ou Recusar este roteiro?</p>
                  <div style={styles.modalActions}>
                    <button
                      style={styles.confirmButton}
                      onClick={() => handleSelectStatus(3)}
                    >
                      Aprovar
                    </button>
                    <button
                      style={styles.cancelButton}
                      onClick={() => handleSelectStatus(8)}
                    >
                      Recusar
                    </button>
                  </div>
                </>
              )}

              {selectStatus === 8 && (
                <>
                  <h3>Justificativa para a Recusa</h3>
                  <textarea
                    required
                    style={styles.textarea}
                    value={justificativa}
                    onChange={(e) => setJustificativa(e.target.value)}
                  />
                </>
              )}

              {selectStatus !== null && selectStatus !== 8 && (
                <>
                  <h3>Observação</h3>
                  <textarea
                    style={styles.textarea}
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                  />
                </>
              )}

              {selectStatus !== null && (
                <>
                  <p>Você tem certeza que deseja alterar o status?</p>
                  <div style={styles.modalActions}>
                    <button
                      style={styles.button}
                      onClick={confirmAlterarStatus}
                      disabled={selectStatus === 8 ? !justificativa : false}
                    >
                      Confirmar
                    </button>
                    <button style={styles.button} onClick={cancelAlterarStatus}>
                      Cancelar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        <VotacaoModal
          isOpen={isVotacaoModalOpen}
          onClose={() => setIsVotacaoModalOpen(false)}
          onSubmit={handleVotoSubmit}
        />
      </main>
      <MessageModal
        isOpen={isMessageOpen}
        onClose={() => setIsMessageOpen(false)}
        message={messageText}
        type={messageType}
      />
    </div>
  );
};

export default Dashboard;

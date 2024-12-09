import styles from "./styles";
import * as mammoth from "mammoth";
import React, { useState } from "react";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import { enviarRoteiro } from "../../../services/roteiroService";

const EnviarRoteiro = () => {
  const [nomeCliente, setNomeCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");
  const [telefoneCliente, setTelefoneCliente] = useState("");
  const [roteiroTexto, setRoteiroTexto] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const navigate = useNavigate();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileType = file.type;

    if (fileType === "text/plain") {
      const text = await file.text();
      setRoteiroTexto(text);
    } else if (fileType === "application/pdf") {
      const pdfjsLib = await import("pdfjs-dist");
      const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
      let text = "";

      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const content = await page.getTextContent();
        text += content.items.map((item) => item.str).join(" ");
      }
      setRoteiroTexto(text);
    } else if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      setRoteiroTexto(result.value);
    } else {
      alert(
        "Formato de arquivo não suportado. Envie um arquivo .txt, .pdf ou .docx."
      );
    }
  };

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarEmail(emailCliente)) {
      alert("Por favor, insira um email válido.");
      return;
    }

    const roteiro = {
      textoRoteiro: roteiroTexto,
      cliente: {
        nome: nomeCliente,
        email: emailCliente,
        telefone: telefoneCliente,
      },
    };

    try {
      await enviarRoteiro(roteiro);
      setMensagemSucesso("Roteiro enviado com sucesso!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Erro ao enviar roteiro:", error);
      alert("Erro ao enviar roteiro. Tente novamente.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Envie seu Roteiro</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Nome Completo</label>
        <input
          style={styles.input}
          type="text"
          placeholder="Nome completo"
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
          required
        />
        <label style={styles.label}>Email</label>
        <input
          style={styles.input}
          type="email"
          placeholder="email@exemplo.com"
          value={emailCliente}
          onChange={(e) => setEmailCliente(e.target.value)}
          required
        />
        <label style={styles.label}>Telefone</label>
        <InputMask
          style={styles.input}
          mask="(99) 99999-9999"
          placeholder="(xx) xxxxx-xxxx"
          value={telefoneCliente}
          onChange={(e) => setTelefoneCliente(e.target.value)}
          required
        />
        <label style={styles.label}>Anexo do Roteiro (.txt, .pdf, .docx)</label>
        <input
          style={styles.input}
          type="file"
          accept=".txt, .pdf, .docx"
          onChange={handleFileUpload}
          required
        />
        <button type="submit" style={styles.button}>
          Enviar
        </button>
      </form>
      {mensagemSucesso && <div style={styles.sucesso}>{mensagemSucesso}</div>}
    </div>
  );
};

export default EnviarRoteiro;

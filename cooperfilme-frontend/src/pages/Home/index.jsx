import styles from "./styles.js";
import React, { useState } from "react";
import { login } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginToggle = () => {
    setLoginVisible(!loginVisible);
    setError("");
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div style={styles.homeContainer}>
      <header style={styles.header}>
        <div style={styles.loginContainer}>
          <button style={styles.loginButton} onClick={handleLoginToggle}>
            {loginVisible ? "Fechar Login" : "Fazer Login"}
          </button>
          {loginVisible && (
            <div style={styles.loginForm}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.loginFormInput}
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.loginFormInput}
              />
              <button style={styles.loginFormButton} onClick={handleLogin}>
                Entrar
              </button>
              {error && <p style={styles.errorMessage}>{error}</p>}
            </div>
          )}
        </div>
      </header>

      <main style={styles.mainContent}>
        <h1 style={styles.mainContentH1}>Bem-vindo ao Cooperfilmes!</h1>
        <p style={styles.mainContentP}>
          Envie seu roteiro e comece a trilha da aprovação!
        </p>
        <div style={styles.buttonContainer}>
          <Link to="/enviar-roteiro">
            <button style={styles.sendButton}>Enviar Roteiro</button>
          </Link>
          <Link to="/consultar-status">
            <button style={styles.statusButton}>Consultar Roteiro</button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;

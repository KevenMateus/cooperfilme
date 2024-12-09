import { jwtDecode } from "jwt-decode";

export const getUserInfo = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decodedToken = jwtDecode(token);
    return {
      usuarioId: decodedToken.usuarioId,
      nome: decodedToken.nome,
      cargo: decodedToken.cargo,
    };
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
};

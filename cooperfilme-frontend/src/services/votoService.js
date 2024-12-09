import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const votar = async (roteiroId, votoRequestDto, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/votos/${roteiroId}/votar`,
      votoRequestDto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar voto:", error);
    throw error;
  }
};

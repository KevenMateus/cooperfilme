import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const buscarRoteiros = async (
  filtroNome,
  filtroDataInicio,
  filtroDataFim,
  filtroStatus,
  token
) => {
  try {
    const response = await axios.get(`${API_URL}/roteiros/consultar`, {
      params: {
        clienteNome: filtroNome,
        dataInicio: filtroDataInicio,
        dataFim: filtroDataFim,
        status: filtroStatus,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar roteiros:", error);
    throw error;
  }
};

export const atualizarStatusRoteiro = async (id, dto, token) => {
  try {
    const response = await fetch(`${API_URL}/roteiros/alterar-status/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify(dto),
    });
    if (!response.ok) {
      throw new Error("Erro ao atualizar o status");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const enviarRoteiro = async (roteiro) => {
  try {
    const response = await axios.post(`${API_URL}/roteiros/enviar`, roteiro, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar roteiro:", error);
    throw error;
  }
};

export const buscarRoteirosStatus = async (emailCliente) => {
  try {
    const response = await fetch(`${API_URL}/roteiros/consultar-status?emailCliente=${emailCliente}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar roteiros.");
    }

    console.log(response.data)

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar roteiros:", error);
    throw error;
  }
  
};


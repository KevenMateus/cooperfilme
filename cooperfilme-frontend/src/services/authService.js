export const login = async (email, password) => {
  const response = await fetch("/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha: password }),
  });

  if (!response.ok) {
    console.error("Erro na resposta da API:", response.status);
    throw new Error("Erro no login");
  }

  const { token } = await response.json();
  localStorage.setItem("token", token);
};

export const getUserData = async (token) => {
  const response = await fetch('/usuarios', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao obter dados do usuário');
  }

  return response.json();
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

import axios from "axios";

// Cria uma instância do Axios com a URL base da sua API
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Usa a variável de ambiente definida
  headers: {
    "Content-Type": "application/json", // Define o tipo de conteúdo padrão para JSON
  },
});

export default api;

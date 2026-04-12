// src/componentes/ProtectedRoute.jsx
import { jwtDecode } from "jwt-decode"; // Importa a biblioteca para decodificação
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 1. VERIFICAÇÃO INICIAL: Token Ausente
    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    try {
      const decoded = jwtDecode(token);
      // Checa se o token expirou (decoded.exp está em segundos, Date.now() está em milissegundos)
      const currentTime = Date.now() / 1000;

      // 2. VERIFICAÇÃO DE EXPIRAÇÃO
      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        alert("Sua sessão expirou. Por favor, faça login novamente.");

        navigate("/", { replace: true });
        return;
      }

      // 3. TOKEN VÁLIDO
      setIsAuthenticated(true);
    } catch (e) {
      // Trata erro de token mal-formatado/inválido
      localStorage.removeItem("token");
      alert("Token de sessão inválido. Faça login novamente.");
      navigate("/", { replace: true });
      return;
    } finally {
      setLoading(false);
    }
  }, [navigate, location.pathname]);

  if (loading) {
    // Tela de carregamento enquanto a verificação é feita
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-50 to-white">
        <p className="text-sky-800 font-semibold">
          Verificando autenticação...
        </p>
      </div>
    );
  }

  // Se autenticado, renderiza os componentes filhos
  return isAuthenticated ? children : null;
};

export default ProtectedRoute;

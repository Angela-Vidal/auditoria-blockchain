// src/componentes/ResetPassword.jsx
import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/enviroments";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const token = new URLSearchParams(location.search).get("token");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Senha alterada com sucesso!");
        navigate("/login");
      } else {
        alert(data.message || "Erro ao redefinir senha.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar ao servidor.");
    }
  };

  return (
    // Adicionando classes para centralizar o conteúdo na tela
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/25 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] w-[420px]">
        <div className="flex justify-center items-center mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-3 rounded-full shadow-lg">
            <FaLock className="text-white text-3xl" />
          </div>
        </div>

        <h2 className="text-center text-2xl font-extrabold text-sky-800 mb-1">
          Redefinir senha
        </h2>
        <p className="text-center text-sm text-gray-700 mb-6">
          Crie uma nova senha segura para sua conta.
        </p>

        <form className="space-y-5" onSubmit={handleReset}>
          {/* Nova senha */}
          <div>
            <label className="text-sm font-medium text-sky-800">
              Nova senha
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-400" />
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-2 border border-sky-300/60 rounded-md focus:ring-2 focus:ring-sky-400 bg-white/80 placeholder-sky-300"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-400 hover:text-sky-600"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white py-2 rounded-md font-semibold shadow-lg hover:from-blue-600 hover:to-cyan-500 transition-all"
          >
            Alterar senha
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

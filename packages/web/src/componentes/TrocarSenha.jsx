import { useState } from "react";
import { FaArrowLeft, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/enviroments";

const TrocarSenha = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("A confirmação de senha não coincide!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Sessão expirada. Faça login novamente.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });

      let message = "";
      try {
        const data = await response.json();
        message = data.message || JSON.stringify(data);
      } catch {
        message = await response.text();
      }

      if (!response.ok) {
        alert("Erro ao alterar senha: " + message);
      } else {
        alert("Senha alterada com sucesso!");
        navigate("/perfil");
      }
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      alert("Erro ao conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 via-cyan-50 to-white flex flex-col">
      {/* Cabeçalho */}
      <header className="backdrop-blur-md bg-white/80 border-b border-cyan-100 shadow-md">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/perfil")}
            className="text-cyan-600 hover:text-blue-600 transition"
          >
            <FaArrowLeft className="text-2xl" />
          </button>
          <h1 className="text-2xl font-bold text-sky-900">Alterar Senha</h1>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white/80 backdrop-blur-xl border border-cyan-100 rounded-2xl shadow-xl w-full max-w-md p-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-3 rounded-full shadow-md">
              <FaLock className="text-white text-3xl" />
            </div>
          </div>

          <h2 className="text-center text-2xl font-bold text-sky-900 mb-2">
            Atualizar senha
          </h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Por segurança, informe sua senha atual e defina uma nova.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Senha atual */}
            <div>
              <label
                htmlFor="oldPassword"
                className="text-sm font-medium text-sky-800"
              >
                Senha atual
              </label>
              <input
                type="password"
                id="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border border-sky-300/60 rounded-md bg-white/80
                focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none transition-all"
              />
            </div>

            {/* Nova senha */}
            <div>
              <label
                htmlFor="newPassword"
                className="text-sm font-medium text-sky-800"
              >
                Nova senha
              </label>
              <input
                type="password"
                id="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border border-sky-300/60 rounded-md bg-white/80
                focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none transition-all"
              />
            </div>

            {/* Confirmar nova senha */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-sky-800"
              >
                Confirmar nova senha
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border border-sky-300/60 rounded-md bg-white/80
                focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none transition-all"
              />
            </div>

            {/* Botão salvar */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md font-semibold shadow-md text-white transition-all
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500"
              }`}
            >
              {loading ? "Salvando..." : "Salvar nova senha"}
            </button>

            {/* Voltar */}
            <button
              type="button"
              onClick={() => navigate("/perfil")}
              className="w-full text-center text-cyan-600 hover:text-blue-700 mt-2 font-medium"
            >
              Cancelar e voltar ao perfil
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TrocarSenha;

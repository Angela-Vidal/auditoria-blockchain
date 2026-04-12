// src/componentes/AddAdminForm.jsx
import { useState } from "react";
import { FaArrowLeft, FaShieldAlt, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/enviroments";

const AddAdminForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    document: "",
    city: "",
    state: "",
    birthDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao registrar Admin.");
      }

      alert("Novo Administrador do Sistema cadastrado com sucesso!");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Erro ao registrar Admin:", error);
      alert("Erro: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // LAYOUT ADMIN: Gradiente Vermelho/Rosa
    <div className="w-full min-h-screen bg-gradient-to-br from-red-100 via-pink-50 to-white">
      {/* Cabeçalho Vermelho */}
      <header className="backdrop-blur-md bg-white/80 shadow-md border-b border-red-100">
        <div className="max-w-xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="text-red-600 hover:text-red-700 transition-colors"
          >
            <FaArrowLeft className="text-2xl" />
          </button>
          <div className="flex items-center gap-2">
            <FaUserPlus className="text-red-800 text-xl" />
            <h1 className="text-2xl font-bold text-red-800 tracking-tight">
              Adicionar Admin Global
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-6 py-12">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-red-100">
          <h2 className="text-xl font-semibold text-red-900 mb-6 flex items-center gap-2">
            <FaShieldAlt /> Cadastro de Administrador
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Linha 1 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-red-800 uppercase">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Nome Completo"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-red-200 rounded focus:ring-2 focus:ring-red-400 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-red-800 uppercase">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-red-200 rounded focus:ring-2 focus:ring-red-400 outline-none"
                />
              </div>
            </div>

            {/* Linha 2 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-red-800 uppercase">
                  Senha
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Senha"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-red-200 rounded focus:ring-2 focus:ring-red-400 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-red-800 uppercase">
                  Telefone
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-red-200 rounded focus:ring-2 focus:ring-red-400 outline-none"
                />
              </div>
            </div>

            {/* Linha 3 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-red-800 uppercase">
                  CPF
                </label>
                <input
                  type="text"
                  name="document"
                  placeholder="CPF (11 dígitos)"
                  value={formData.document}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-red-200 rounded focus:ring-2 focus:ring-red-400 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-red-800 uppercase">
                  Nascimento
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-red-200 rounded focus:ring-2 focus:ring-red-400 outline-none"
                />
              </div>
            </div>

            {/* Linha 4 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-red-800 uppercase">
                  Cidade
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="Cidade"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-red-200 rounded focus:ring-2 focus:ring-red-400 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-red-800 uppercase">
                  Estado
                </label>
                <input
                  type="text"
                  name="state"
                  placeholder="UF"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-red-200 rounded focus:ring-2 focus:ring-red-400 outline-none"
                />
              </div>
            </div>

            {/* Botão Vermelho */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-md font-semibold shadow-md hover:from-red-700 hover:to-pink-700 transition duration-300"
            >
              {loading ? "Registrando..." : "Registrar Novo Admin"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddAdminForm;

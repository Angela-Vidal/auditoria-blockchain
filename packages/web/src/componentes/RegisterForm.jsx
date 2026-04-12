import { useState } from "react";
import {
  FaCalendarAlt,
  FaEnvelope,
  FaIdCard,
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/enviroments";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    telefone: "",
    cidade: "",
    estado: "",
    cpf: "",
    dataNascimento: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register/donor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.nome,
          email: formData.email,
          password: formData.senha,
          phone: formData.telefone,
          document: formData.cpf,
          city: formData.cidade,
          state: formData.estado,
          birthDate: formData.dataNascimento,
        }),
      });

      let errorMessage = "";
      try {
        const data = await response.json();
        errorMessage = data.message || JSON.stringify(data);
      } catch {
        errorMessage = await response.text();
      }

      if (!response.ok) {
        alert("Erro ao cadastrar usuário: " + errorMessage);
        return;
      }

      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Erro no front: " + error.message);
    }
  };

  return (
    // Centralização do layout (min-h-screen flex items-center justify-center)
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/25 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] w-[450px] overflow-y-auto max-h-[90vh]">
        {/* Ícone do topo */}
        <div className="flex justify-center items-center mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-3 rounded-full shadow-md">
            <FaUser className="text-white text-3xl" />
          </div>
        </div>

        <h2 className="text-center text-2xl font-bold mb-1 text-sky-800">
          Criar conta
        </h2>
        <p className="text-center text-sm text-gray-700 mb-6">
          Junte-se a nós e faça parte dessa rede de solidariedade 💙
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {[
            {
              id: "nome",
              label: "Nome completo",
              icon: <FaUser />,
              type: "text",
            },
            {
              id: "email",
              label: "E-mail",
              icon: <FaEnvelope />,
              type: "email",
            },
            {
              id: "telefone",
              label: "Telefone",
              icon: <FaPhone />,
              type: "tel",
            },
            { id: "cpf", label: "CPF", icon: <FaIdCard />, type: "text" },
            {
              id: "cidade",
              label: "Cidade",
              icon: <FaMapMarkerAlt />,
              type: "text",
            },
          ].map((field) => (
            <div key={field.id} className="space-y-1">
              <label
                htmlFor={field.id}
                className="text-sm font-medium text-sky-800"
              >
                {field.label}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500">
                  {field.icon}
                </span>
                <input
                  id={field.id}
                  type={field.type}
                  value={formData[field.id]}
                  onChange={handleChange}
                  required
                  placeholder={field.label}
                  className="w-full pl-10 pr-4 py-2 border border-sky-300/60 rounded-md bg-white/80
                  focus:ring-2 focus:ring-sky-400 focus:border-sky-400 placeholder-sky-300 outline-none transition-all"
                />
              </div>
            </div>
          ))}

          {/* Estado */}
          <div className="space-y-1">
            <label
              htmlFor="estado"
              className="text-sm font-medium text-sky-800"
            >
              Estado
            </label>
            <input
              type="text"
              id="estado"
              placeholder="UF"
              value={formData.estado}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-sky-300/60 rounded-md bg-white/80
              focus:ring-2 focus:ring-sky-400 focus:border-sky-400 placeholder-sky-300 outline-none transition-all"
            />
          </div>

          {/* Data de nascimento */}
          <div className="space-y-1">
            <label
              htmlFor="dataNascimento"
              className="text-sm font-medium text-sky-800"
            >
              Data de nascimento
            </label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500" />
              <input
                type="date"
                id="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-sky-300/60 rounded-md bg-white/80
                focus:ring-2 focus:ring-sky-400 focus:border-sky-400 placeholder-sky-300 outline-none transition-all"
              />
            </div>
          </div>

          {/* Senha */}
          <div className="space-y-1">
            <label htmlFor="senha" className="text-sm font-medium text-sky-800">
              Senha
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500" />
              <input
                type="password"
                id="senha"
                placeholder="********"
                value={formData.senha}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-sky-300/60 rounded-md bg-white/80
                focus:ring-2 focus:ring-sky-400 focus:border-sky-400 placeholder-sky-300 outline-none transition-all"
              />
            </div>
          </div>

          {/* Confirmar senha */}
          <div className="space-y-1">
            <label
              htmlFor="confirmarSenha"
              className="text-sm font-medium text-sky-800"
            >
              Confirmar senha
            </label>
            <input
              type="password"
              id="confirmarSenha"
              placeholder="********"
              value={formData.confirmarSenha}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-sky-300/60 rounded-md bg-white/80
              focus:ring-2 focus:ring-sky-400 focus:border-sky-400 placeholder-sky-300 outline-none transition-all"
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white py-2 rounded-md font-semibold shadow-md hover:from-blue-600 hover:to-cyan-500 hover:shadow-lg transition-all duration-300"
          >
            Cadastrar
          </button>

          {/* Link login */}
          <div className="text-center text-sm">
            <span className="text-gray-700">Já tem uma conta? </span>
            <a
              href="/login"
              className="text-cyan-600 hover:text-blue-600 hover:underline font-medium"
            >
              Faça login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

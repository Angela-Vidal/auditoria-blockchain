// src/componentes/Home.jsx
import {
  FaBuilding,
  FaHeart,
  FaSignInAlt,
  FaUser,
  FaUserShield,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/25 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] w-[450px] text-center">
        <div className="flex justify-center items-center mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-4 rounded-full shadow-lg">
            <FaHeart className="text-white text-4xl" />
          </div>
        </div>

        <h2 className="text-center text-3xl font-extrabold mb-2 text-sky-100">
          Bem-vindo(a)
        </h2>
        <p className="text-center text-sm text-gray-300 mb-8">
          Escolha o seu perfil de acesso ou registre-se.
        </p>

        {/* Botões de Acesso */}
        <div className="space-y-4">
          {/* 1. Login Doador */}
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-md font-semibold shadow-md hover:from-cyan-600 hover:to-blue-600 transition-all flex items-center justify-center gap-3"
          >
            <FaSignInAlt /> Login Doador
          </button>

          {/* 2. Login Membro/Área Restrita */}
          <button
            onClick={() => navigate("/member-login")}
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-md font-semibold shadow-md hover:from-green-600 hover:to-teal-600 transition-all flex items-center justify-center gap-3"
          >
            <FaUser /> Acesso Membros/Gestores
          </button>

          <button
            onClick={() => navigate("/admin-login")}
            className="w-full bg-gradient-to-r from-red-600 to-pink-500 text-white py-3 rounded-md font-semibold shadow-md hover:from-red-700 hover:to-pink-600 transition-all flex items-center justify-center gap-3"
          >
            <FaUserShield /> Área Administrativa
          </button>

          <div className="border-t border-gray-400/30 my-4"></div>

          {/* 3. Criar Organização */}
          <button
            onClick={() => navigate("/organization-register")}
            className="w-full bg-white text-sky-800 border border-sky-800 py-3 rounded-md font-semibold shadow-md hover:bg-gray-100 transition-all flex items-center justify-center gap-3"
          >
            <FaBuilding /> Registrar Organização
          </button>

          {/* 4. Cadastro de Doador (Link Simples) */}
          <div className="text-center pt-4">
            <span className="text-gray-300">Não tem conta? </span>
            <a
              href="/register-donor"
              className="text-cyan-400 hover:text-blue-300 hover:underline font-medium"
            >
              Crie sua conta de Doador
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

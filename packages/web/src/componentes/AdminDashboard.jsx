// src/componentes/AdminDashboard.jsx
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import {
  FaChartLine,
  FaCheckSquare,
  FaClipboardList,
  FaList,
  FaShieldAlt,
  FaSignOutAlt,
  FaTasks,
  FaUserCog,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Admin");

  // Links EXCLUSIVOS para o ADMIN do Sistema
  const adminLinks = [
    {
      path: "/admin/organizations",
      icon: <FaCheckSquare />,
      title: "Aprovar Organizações",
      description: "Verificar e aprovar o cadastro de novas entidades.",
    },
    {
      path: "/admin/all-organizations",
      icon: <FaList />,
      title: "Listar Organizações",
      description: "Visualizar todas as organizações cadastradas.",
    },
    {
      path: "/admin/add-admin",
      icon: <FaUserPlus />,
      title: "Adicionar Admin Global",
      description: "Cadastrar novos Administradores do Sistema.",
    },
    {
      // Aponta para o NOVO componente refatorado
      path: "/admin/projects",
      icon: <FaTasks />,
      title: "Auditar Projetos",
      description: "Visualizar projetos de qualquer organização cadastrada.",
    },
    {
      // Aponta para o NOVO componente refatorado
      path: "/admin/members",
      icon: <FaUsers />,
      title: "Auditar Membros",
      description: "Consultar equipes das organizações.",
    },
    {
      path: "/admin/expenses",
      icon: <FaClipboardList />,
      title: "Auditar Despesas",
      description: "Verificação cruzada de despesas por projeto.",
    },
    {
      path: "/admin/allocations",
      icon: <FaChartLine />,
      title: "Ver Alocações",
      description: "Rastreio global de destinação de recursos.",
    },
    {
      path: "/admin/finance",
      icon: <FaChartLine />,
      title: "Financeiro Global",
      description: "Dashboard financeiro por organização.",
    },
    {
      path: "/admin/volunteer-logs",
      icon: <FaClipboardList />,
      title: "Logs de Voluntários",
      description: "Monitoramento de horas em todo o sistema.",
    },
    {
      path: "/admin/blockchain",
      icon: <FaShieldAlt />,
      title: "Blockchain",
      description: "Registro imutável de transações.",
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role !== "ADMIN") {
        navigate("/member-dashboard");
      }
      setUserName("Administrador Global");
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-red-100 via-pink-50 to-white overflow-y-auto">
      <header className="backdrop-blur-md bg-white/80 border-b border-red-200 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-red-600 to-pink-500 p-2 rounded-lg shadow-sm">
              <FaUserCog className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-extrabold text-red-800 tracking-tight">
              PAINEL ADM CENTRAL
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-red-700 font-medium">
              ADMINISTRADOR GERAL
            </span>
            <button
              onClick={handleLogout}
              className="text-red-800 hover:text-red-500 transition"
            >
              <FaSignOutAlt className="text-xl" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-red-900 mb-4">
            Bem-vindo(a), {userName} 👋
          </h2>
          <p className="text-gray-600 mb-8">
            Controle total sobre organizações, usuários e auditoria.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {adminLinks.map((link, index) => (
            <div
              key={index}
              onClick={() => navigate(link.path)}
              className="cursor-pointer bg-white/70 backdrop-blur-lg border border-red-200 
                                     p-6 rounded-xl shadow-lg hover:bg-red-50 transition-all duration-300 flex items-start space-x-4"
            >
              <div className="text-red-600 text-3xl mt-1">{link.icon}</div>
              <div>
                <h4 className="text-xl text-red-800 font-semibold mb-1">
                  {link.title}
                </h4>
                <p className="text-gray-600 text-sm">{link.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

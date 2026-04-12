// src/componentes/MemberDashboard.jsx
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import {
  FaBuilding,
  FaChartLine,
  FaClipboardList,
  FaHistory,
  FaSignOutAlt,
  FaTasks,
  FaUserCircle,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/enviroments";

const MemberDashboard = () => {
  const navigate = useNavigate();
  const [memberRole, setMemberRole] = useState(null);
  const [userName, setUserName] = useState("Membro");

  // Mapeamento de links por função
  const accessLinks = {
    ORG_ADMIN: [
      {
        path: "/perfil",
        icon: <FaUserCircle />,
        title: "Meu Perfil",
        description: "Visualizar dados da conta.",
      },
      {
        path: "/projetos",
        icon: <FaTasks />,
        title: "Gerenciar Projetos",
        description: "Criação, edição e gestão de projetos.",
      },
      {
        path: "/membros",
        icon: <FaUsers />,
        title: "Gerenciar Membros",
        description: "Contratação, desligamento e funções da equipe.",
      },
      {
        path: "/despesas",
        icon: <FaClipboardList />,
        title: "Gerenciar Despesas",
        description: "Registro, edição e aprovação de custos.",
      },
      {
        path: "/alocacoes",
        icon: <FaChartLine />,
        title: "Alocação de Recursos",
        description: "Visualizar e registrar a destinação de doações.",
      },
      {
        path: "/financeiro",
        icon: <FaChartLine />,
        title: "Dashboard Financeiro",
        description: "Visão geral de receitas e despesas.",
      },
      {
        path: "/voluntariado",
        icon: <FaClipboardList />,
        title: "Voluntariado",
        description: "Gestão e aprovação de horas voluntárias.",
      },
      {
        path: "/auditoria/blockchain",
        icon: <FaUserShield />,
        title: "Auditoria Blockchain",
        description: "Consulta e verificação de transações.",
      },
      {
        path: "/status-history",
        icon: <FaHistory />,
        title: "Histórico de Status",
        description: "Auditoria completa de mudanças no sistema.",
      },
      {
        path: "/organization/profile",
        icon: <FaBuilding />,
        title: "Perfil da Organização",
        description: "Editar dados, contato e configurações da ONG.",
      },
    ],
    AUDITOR: [
      {
        path: "/perfil",
        icon: <FaUserCircle />,
        title: "Meu Perfil",
        description: "Visualizar dados da conta.",
      },
      {
        path: "/projetos",
        icon: <FaTasks />,
        title: "Ver Projetos",
        description: "Acompanhar o status e as metas dos projetos.",
      },
      {
        path: "/despesas",
        icon: <FaClipboardList />,
        title: "Auditar Despesas",
        description: "Aprovar (se permitido) e consultar custos.",
      },
      {
        path: "/alocacoes",
        icon: <FaChartLine />,
        title: "Ver Alocação",
        description: "Verificar a destinação dos recursos das doações.",
      },
      {
        path: "/voluntariado",
        icon: <FaClipboardList />,
        title: "Ver/Aprovar Horas Voluntárias",
        description: "Consulta e gestão de logs de voluntários.",
      },
      {
        path: "/auditoria/blockchain",
        icon: <FaUserShield />,
        title: "Auditoria Blockchain",
        description: "Consulta e verificação de transações.",
      },
      {
        path: "/status-history",
        icon: <FaHistory />,
        title: "Histórico de Status",
        description: "Auditoria completa de mudanças no sistema.",
      },
    ],
    VOLUNTEER: [
      {
        path: "/perfil",
        icon: <FaUserShield />,
        title: "Meu Perfil",
        description: "Acessar e editar seus dados pessoais.",
      },
      {
        path: "/projetos",
        icon: <FaTasks />,
        title: "Projetos Ativos",
        description: "Visualizar projetos nos quais pode atuar.",
      },
      {
        path: "/voluntariado/horas",
        icon: <FaClipboardList />,
        title: "Registrar Horas",
        description: "Lançar e consultar suas horas de voluntariado.",
      },
    ],
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/member-login"); // Redireciona se não houver token
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      // O memberRole é injetado no payload pelo back-end
      setMemberRole(decodedToken.memberRole);

      // Buscar nome do membro (ou usar um nome genérico se não for armazenado no token)
      // (Melhoria: Em um cenário real, o nome deveria ser buscado via GET /members/:id)
      fetch(`${API_BASE_URL}/members/${decodedToken.publicId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((data) => data.json())
        .then((data) => {
          setUserName(data.name);
        });
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      localStorage.removeItem("token");
      navigate("/member-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/member-login");
  };

  // Mapeia o nome do cargo para exibição
  const roleMap = {
    ORG_ADMIN: "Administrador da Organização",
    AUDITOR: "Auditor",
    VOLUNTEER: "Voluntário",
  };

  const links = accessLinks[memberRole] || [];

  if (!memberRole) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 via-cyan-50 to-white flex justify-center items-center">
        <p className="text-sky-800 font-semibold">Carregando permissões...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-100 via-teal-50 to-white overflow-y-auto">
      {/* Cabeçalho */}
      <header className="backdrop-blur-md bg-white/80 border-b border-teal-100 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo e título */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-2 rounded-lg shadow-sm">
              <FaUserShield className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-extrabold text-teal-800 tracking-tight">
              Portal da Organização
            </h1>
          </div>

          {/* Ações de usuário */}
          <div className="flex items-center gap-4">
            <span className="text-teal-700 font-medium">
              {roleMap[memberRole] || "Membro"}
            </span>
            {/* Logout */}
            <button
              onClick={handleLogout}
              className="text-teal-800 hover:text-red-500 transition"
            >
              <FaSignOutAlt className="text-xl" />
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-teal-900 mb-4">
            Bem-vindo(a), {userName} 👋
          </h2>
          <p className="text-gray-600 mb-8">
            Seu portal de gestão e transparência.
          </p>
        </section>

        <h3 className="text-2xl font-semibold text-teal-900 mb-6">
          Acesso Rápido
        </h3>

        {/* Atalhos com base na role */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {links.map((link, index) => (
            <div
              key={index}
              onClick={() => navigate(link.path)}
              className="cursor-pointer bg-white/70 backdrop-blur-lg border border-teal-100 
                                     p-6 rounded-xl shadow-md hover:bg-white/90 transition-all duration-300 flex items-start space-x-4"
            >
              <div className="text-teal-600 text-3xl mt-1">{link.icon}</div>
              <div>
                <h4 className="text-xl text-teal-800 font-semibold mb-1">
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

export default MemberDashboard;

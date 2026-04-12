// src/componentes/AdminExpensesManager.jsx
import { useEffect, useState } from "react";
import { FaArrowLeft, FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/enviroments";

const formatCurrency = (val) =>
  `R$ ${parseFloat(val).toFixed(2).replace(".", ",")}`;

export default function AdminExpensesManager() {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [selectedOrgId, setSelectedOrgId] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");

  const token = localStorage.getItem("token");

  // 1. Carregar Orgs
  useEffect(() => {
    fetch(`${API_BASE_URL}/organizations`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOrganizations(Array.isArray(data) ? data : []));
  }, [token]);

  // 2. Carregar Projetos ao selecionar Org
  useEffect(() => {
    if (!selectedOrgId) {
      setProjects([]);
      return;
    }
    fetch(`${API_BASE_URL}/organizations/${selectedOrgId}/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []));
  }, [selectedOrgId, token]);

  // 3. Carregar Despesas ao selecionar Projeto
  useEffect(() => {
    if (!selectedProjectId) {
      setExpenses([]);
      return;
    }
    fetch(`${API_BASE_URL}/projects/${selectedProjectId}/expenses`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setExpenses(Array.isArray(data) ? data : []));
  }, [selectedProjectId, token]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-red-100 via-pink-50 to-white">
      <header className="backdrop-blur-md bg-white/80 shadow-md border-b border-red-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="text-red-600 hover:text-red-700 transition-colors"
          >
            <FaArrowLeft className="text-2xl" />
          </button>
          <h1 className="text-2xl font-bold text-red-800 tracking-tight flex items-center gap-2">
            <FaClipboardList /> Auditoria de Despesas
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Filtros */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-red-100 mb-8 grid grid-cols-2 gap-4">
          <div>
            <label className="text-red-800 font-bold text-xs uppercase">
              Organização
            </label>
            <select
              className="w-full p-2 border rounded"
              value={selectedOrgId}
              onChange={(e) => setSelectedOrgId(e.target.value)}
            >
              <option value="">-- Selecione --</option>
              {organizations.map((o) => (
                <option key={o.public_id} value={o.public_id}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-red-800 font-bold text-xs uppercase">
              Projeto
            </label>
            <select
              className="w-full p-2 border rounded"
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              disabled={!selectedOrgId}
            >
              <option value="">-- Selecione --</option>
              {projects.map((p) => (
                <option key={p.public_id} value={p.public_id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-red-100">
          {expenses.length === 0 ? (
            <p className="text-gray-500 italic">Nenhuma despesa para exibir.</p>
          ) : (
            <div className="space-y-3">
              {expenses.map((e) => (
                <div
                  key={e.public_id}
                  className="flex justify-between items-center p-3 border-b border-red-50"
                >
                  <div>
                    <p className="font-bold text-gray-800">{e.name}</p>
                    <p className="text-xs text-gray-500">{e.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-700">
                      {formatCurrency(e.value)}
                    </p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        e.status === "APPROVED"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {e.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

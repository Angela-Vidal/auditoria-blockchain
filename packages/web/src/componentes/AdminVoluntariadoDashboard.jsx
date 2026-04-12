// src/componentes/AdminVoluntariadoDashboard.jsx
import { useEffect, useState } from "react";
import { FaArrowLeft, FaHandHoldingHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/enviroments";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function AdminVoluntariadoDashboard() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        // Endpoint específico solicitado: GET /api/volunteer-logs/all
        const response = await fetch(`${API_BASE_URL}/volunteer-logs/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Falha ao carregar logs globais.");

        const data = await response.json();
        setLogs(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [token]);

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
          <div className="flex items-center gap-3">
            <FaHandHoldingHeart className="text-red-800 text-2xl" />
            <h1 className="text-2xl font-bold text-red-800 tracking-tight">
              Monitoramento Global de Voluntariado
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-red-100">
          <h2 className="text-xl font-semibold text-red-900 mb-6">
            Todos os Registros de Horas
          </h2>

          {loading ? (
            <p className="text-gray-600">Carregando...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm bg-white rounded-lg overflow-hidden border border-red-100">
                <thead className="bg-red-50 border-b border-red-100 text-red-800 uppercase">
                  <tr>
                    <th className="py-3 px-4">Organização</th>
                    <th className="py-3 px-4">Voluntário</th>
                    <th className="py-3 px-4">Projeto</th>
                    <th className="py-3 px-4 text-center">Horas</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-50">
                  {logs.map((log) => (
                    <tr
                      key={log.public_id}
                      className="hover:bg-red-50/30 transition"
                    >
                      <td className="py-3 px-4 font-medium text-gray-700">
                        {log.volunteer?.organization?.name || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-gray-800">
                        {log.volunteer?.person?.name}
                        <div className="text-xs text-gray-500">
                          {log.volunteer?.person?.email}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {log.project?.title || "Atividade Geral"}
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-red-700">
                        {log.hours_worked}h
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-semibold ${
                            log.status === "APPROVED"
                              ? "bg-green-100 text-green-700"
                              : log.status === "REJECTED"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500 text-xs">
                        {formatDate(log.date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

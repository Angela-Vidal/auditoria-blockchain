// src/componentes/AdminAllocationsManager.jsx
import { useEffect, useState } from "react";
import { FaArrowLeft, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/enviroments";

const formatCurrency = (value) =>
  `R$ ${parseFloat(value).toFixed(2).replace(".", ",")}`;

export default function AdminAllocationsManager() {
  const navigate = useNavigate();
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // GET /allocations sem filtros retorna tudo
        const response = await fetch(`${API_BASE_URL}/allocations`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) setAllocations(await response.json());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
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
          <h1 className="text-2xl font-bold text-red-800 tracking-tight flex items-center gap-2">
            <FaChartLine /> Alocações (Visão Global)
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-red-100">
          {loading ? (
            <p className="text-gray-600">Carregando...</p>
          ) : (
            <div className="space-y-4">
              {allocations.map((a) => (
                <div
                  key={a.public_id}
                  className="p-4 border border-red-100 bg-white rounded-lg flex justify-between items-center shadow-sm"
                >
                  <div>
                    <p className="text-xs text-red-500 font-bold uppercase mb-1">
                      {a.organization?.name || "Org Desconhecida"}
                    </p>
                    <h3 className="font-semibold text-gray-800">
                      Proj: {a.project?.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Doador: {a.donation?.donor?.person?.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600">
                      {formatCurrency(a.amount_allocated)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(a.allocation_date).toLocaleDateString()}
                    </p>
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

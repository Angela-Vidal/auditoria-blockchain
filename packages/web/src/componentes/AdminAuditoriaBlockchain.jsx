// src/componentes/AdminAuditoriaBlockchain.jsx
import { useEffect, useState } from "react";
import { FaArrowLeft, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/enviroments";

export default function AdminAuditoriaBlockchain() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API_BASE_URL}/blockchain`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTransactions(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, [token]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-red-100 via-pink-50 to-white">
      <header className="backdrop-blur-md bg-white/80 shadow-md border-b border-red-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="text-red-600 hover:text-red-700"
          >
            <FaArrowLeft className="text-2xl" />
          </button>
          <h1 className="text-2xl font-bold text-red-800 flex items-center gap-2">
            <FaShieldAlt /> Auditoria Blockchain (Admin)
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-red-100">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-red-50 text-red-800 uppercase border-b border-red-100">
                <tr>
                  <th className="py-3 px-4">Hash</th>
                  <th className="py-3 px-4">Tipo</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-50">
                {transactions.map((t) => (
                  <tr key={t.hash} className="hover:bg-red-50/30">
                    <td className="py-3 px-4 font-mono text-xs break-all">
                      {t.hash}
                    </td>
                    <td className="py-3 px-4">{t.type}</td>
                    <td className="py-3 px-4 font-bold text-red-600">
                      {t.status}
                    </td>
                    <td className="py-3 px-4 text-right">R$ {t.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

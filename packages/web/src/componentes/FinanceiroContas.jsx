import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/enviroments";

export default function FinanceiroContas() {
  const [aba, setAba] = useState("pagar");
  const [contas, setContas] = useState([]);

  useEffect(() => {
    const carregarContas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/financeiro/${aba}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (!response.ok) {
          setContas([]);
          return;
        }

        const data = await response.json();
        setContas(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao carregar contas:", error);
        setContas([]);
      }
    };

    carregarContas();
  }, [aba]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Contas Financeiras</h1>

      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            aba === "pagar" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setAba("pagar")}
        >
          Contas a Pagar
        </button>

        <button
          className={`px-4 py-2 rounded ${
            aba === "receber" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setAba("receber")}
        >
          Contas a Receber
        </button>

        <button
          className={`px-4 py-2 rounded ${
            aba === "orcamento" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setAba("orcamento")}
        >
          Orçamento
        </button>
      </div>

      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4 capitalize">{aba}</h2>

        {contas.length === 0 ? (
          <p className="text-gray-600">Nenhum registro encontrado.</p>
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-3">Título</th>
                <th className="py-2 px-3">Valor</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Data</th>
              </tr>
            </thead>
            <tbody>
              {contas.map((c) => (
                <tr key={c.public_id} className="border-b">
                  <td className="py-2 px-3">{c.titulo}</td>
                  <td className="py-2 px-3">R$ {c.valor}</td>
                  <td className="py-2 px-3">{c.status}</td>
                  <td className="py-2 px-3">
                    {c.data ? new Date(c.data).toLocaleDateString() : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

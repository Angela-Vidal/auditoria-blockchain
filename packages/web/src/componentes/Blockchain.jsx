// src/componentes/Blockchain.jsx
import { useEffect, useState } from "react";
import { FaArrowLeft, FaLink } from "react-icons/fa"; // Importar ícones e useNavigate
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/enviroments";

// Funções auxiliares para formatação
const formatValue = (value) => {
  // Garantir que o valor seja um número e formatar
  return `R$ ${parseFloat(value).toFixed(2).replace(".", ",")}`;
};

const formatDate = (dateString) => {
  // Formatar data para padrão brasileiro (com hora)
  return new Date(dateString).toLocaleString("pt-BR");
};

export default function Blockchain() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const TOKEN_KEY = "token";

  useEffect(() => {
    carregarTransacoesBlockchain();
  }, []);

  const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
  };

  const carregarTransacoesBlockchain = async () => {
    setLoading(true);
    setError(null);
    const token = getToken();

    if (!token) {
      setError("Token de autorização não encontrado. Faça login novamente.");
      setLoading(false);
      return;
    }

    try {
      // Endpoint: GET /blockchain
      const response = await fetch(`${API_BASE_URL}/blockchain`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar transações blockchain:", error);
      setError(`Falha ao carregar transações: ${error.message}.`);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    // NOVO LAYOUT: Fundo gradiente
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 via-cyan-50 to-white">
      {/* NOVO LAYOUT: Cabeçalho fixo com botão de voltar */}
      <header className="backdrop-blur-md bg-white/70 shadow-md border-b border-cyan-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")} // Botão Voltar para a Dashboard
            className="text-cyan-600 hover:text-cyan-700 transition-colors"
          >
            <FaArrowLeft className="text-2xl" />
          </button>
          <div className="flex items-center gap-3">
            <FaLink className="text-sky-800 text-2xl" />
            <h1 className="text-2xl font-bold text-sky-800 tracking-tight">
              Blockchain - Histórico de Transações
            </h1>
          </div>
        </div>
      </header>

      {/* NOVO LAYOUT: Conteúdo principal centralizado com max-width */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-gray-700 mb-6">
          Exibindo transações (doações e alocações) registradas na rede.
        </p>

        {/* BOX: Histórico de Transações */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-cyan-100">
          {loading ? (
            <p className="text-gray-600">Carregando transações...</p>
          ) : error ? (
            <p className="text-red-500">Erro ao carregar: {error}</p>
          ) : transactions.length === 0 ? (
            <p className="text-gray-600">
              Nenhuma transação de blockchain encontrada.
            </p>
          ) : (
            <div className="space-y-4">
              {transactions.map((t, index) => {
                // Obtém o último log, conforme configurado no `take: 1` do controller
                const lastLog = t.blockchain_logs?.[0];

                return (
                  <div
                    key={t.public_id ?? t.id ?? index}
                    className="border-b pb-4 pt-2"
                  >
                    <p className="text-xs text-gray-500">
                      ID Pública: {t.public_id.substring(0, 8)}...
                    </p>

                    <h3 className="font-semibold text-sky-800 mt-1 mb-1">
                      Hash:{" "}
                      <span className="break-all text-sm font-normal text-gray-700">
                        {t.hash.substring(0, 40)}...
                      </span>
                    </h3>

                    {/* Detalhes da Transação */}
                    <div className="grid grid-cols-2 text-sm gap-x-4">
                      <p>
                        <strong>Tipo:</strong> {t.type}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        <span
                          className={`font-semibold ${
                            t.status === "CONFIRMED"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {t.status}
                        </span>
                      </p>
                      <p>
                        <strong>Valor:</strong> {formatValue(t.value)}
                      </p>
                      <p>
                        <strong>Rede:</strong> {t.network}
                      </p>
                      <p className="col-span-2">
                        <strong>Data:</strong>{" "}
                        {t.timestamp ? formatDate(t.timestamp) : "—"}
                      </p>
                      {t.donation && (
                        <p className="col-span-2 text-green-700 font-medium">
                          Referência: Doação (R$ {formatValue(t.donation.value)}
                          )
                        </p>
                      )}
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      Último Log: {lastLog ? lastLog.message : "N/A"}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

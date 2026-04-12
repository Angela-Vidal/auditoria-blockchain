import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/enviroments";

export default function PortalTransparencia() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/transparencia/home`, {
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) return;
        const data = await response.json();
        setDados(data);
      } catch (error) {
        console.error("Erro ao carregar portal de transparência:", error);
      }
    };

    carregar();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Portal de Transparência
      </h1>

      {!dados ? (
        <p className="text-center">Carregando...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white shadow rounded p-6">
              <h2 className="text-lg font-semibold mb-2">Total Arrecadado</h2>
              <p className="text-3xl font-bold text-green-600">
                R$ {dados.total_arrecadado}
              </p>
            </div>

            <div className="bg-white shadow rounded p-6">
              <h2 className="text-lg font-semibold mb-2">Total Alocado</h2>
              <p className="text-3xl font-bold text-blue-600">
                R$ {dados.total_alocado}
              </p>
            </div>

            <div className="bg-white shadow rounded p-6">
              <h2 className="text-lg font-semibold mb-2">Projetos Ativos</h2>
              <p className="text-3xl font-bold text-purple-600">
                {dados.projetos_ativos}
              </p>
            </div>
          </div>

          <div className="bg-white shadow rounded p-6 mb-10">
            <h2 className="text-xl font-semibold mb-4">
              Últimas Doações Registradas
            </h2>
            <ul className="space-y-3">
              {dados.ultimas_doacoes.map((d, i) => (
                <li key={i} className="border-b pb-2">
                  <p className="font-semibold">{d.nome}</p>
                  <p>R$ {d.valor}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(d.data).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-semibold mb-4">
              Transações Blockchain Recentes
            </h2>
            <ul className="space-y-3">
              {dados.blockchain.map((t, i) => (
                <li key={i} className="border-b pb-2">
                  <p>Hash: {t.hash}</p>
                  <p>Tipo: {t.type}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(t.timestamp).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

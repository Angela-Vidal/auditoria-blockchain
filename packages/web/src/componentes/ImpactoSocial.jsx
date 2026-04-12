import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/enviroments";

export default function ImpactoSocial() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/transparencia/impacto`, {
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) return;
        const data = await response.json();
        setInfo(data);
      } catch (error) {
        console.error("Erro ao carregar impacto social:", error);
      }
    };

    carregar();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Impacto Social Gerado
      </h1>

      {!info ? (
        <p className="text-center">Carregando...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white shadow rounded p-6">
              <h2 className="text-lg font-semibold mb-2">Pessoas Atingidas</h2>
              <p className="text-3xl font-bold text-blue-600">
                {info.pessoas_atendidas}
              </p>
            </div>

            <div className="bg-white shadow rounded p-6">
              <h2 className="text-lg font-semibold mb-2">
                Projetos Concluídos
              </h2>
              <p className="text-3xl font-bold text-green-600">
                {info.projetos_concluidos}
              </p>
            </div>

            <div className="bg-white shadow rounded p-6">
              <h2 className="text-lg font-semibold mb-2">Índice de Impacto</h2>
              <p className="text-3xl font-bold text-purple-600">
                {info.indice_impacto}%
              </p>
            </div>
          </div>

          <div className="bg-white shadow rounded p-6 mb-10">
            <h2 className="text-xl font-semibold mb-4">Benefícios Gerados</h2>
            <ul className="space-y-3">
              {info.beneficios.map((b, i) => (
                <li key={i}>
                  <p className="font-semibold">{b.titulo}</p>
                  <p className="text-gray-700">{b.descricao}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-semibold mb-4">
              Projetos com Maior Impacto
            </h2>

            <ul className="space-y-3">
              {info.top_projetos.map((p, i) => (
                <li key={i} className="border-b pb-2">
                  <p className="font-semibold">{p.nome}</p>
                  <p className="text-sm text-gray-700">Impacto: {p.impacto}</p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

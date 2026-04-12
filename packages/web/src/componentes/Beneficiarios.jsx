import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/enviroments";

export default function Beneficiarios() {
  const [lista, setLista] = useState([]);
  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    nome: "",
    documento: "",
    email: "",
    telefone: "",
    categoria: "",
    impacto: "",
  });

  useEffect(() => {
    const carregar = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_BASE_URL}/beneficiarios`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (!response.ok) {
          setLista([]);
          return;
        }

        const data = await response.json();
        setLista(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao carregar beneficiários:", error);
        setLista([]);
      }
    };

    carregar();
  }, []);

  const abrirNovo = () => {
    setEditando(null);
    setForm({
      nome: "",
      documento: "",
      email: "",
      telefone: "",
      categoria: "",
      impacto: "",
    });
    setModal(true);
  };

  const abrirEdicao = (b) => {
    setEditando(b.public_id);
    setForm({
      nome: b.nome || "",
      documento: b.documento || "",
      email: b.email || "",
      telefone: b.telefone || "",
      categoria: b.categoria || "",
      impacto: b.impacto || "",
    });
    setModal(true);
  };

  const enviar = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const metodo = editando ? "PUT" : "POST";
      const url = editando
        ? `${API_BASE_URL}/beneficiarios/${editando}`
        : `${API_BASE_URL}/beneficiarios`;

      const response = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) return;

      setModal(false);
      const reload = await fetch(`${API_BASE_URL}/beneficiarios`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (!reload.ok) return;
      const data = await reload.json();
      setLista(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao salvar beneficiário:", error);
    }
  };

  const deletar = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/beneficiarios/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) return;

      const reload = await fetch(`${API_BASE_URL}/beneficiarios`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (!reload.ok) return;
      const data = await reload.json();
      setLista(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao excluir beneficiário:", error);
    }
  };

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Beneficiários</h1>
        <button
          onClick={abrirNovo}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Novo Beneficiário
        </button>
      </div>

      <div className="bg-white shadow rounded p-6">
        {lista.length === 0 ? (
          <p className="text-gray-600">Nenhum beneficiário registrado.</p>
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-3">Nome</th>
                <th className="py-2 px-3">Documento</th>
                <th className="py-2 px-3">Email</th>
                <th className="py-2 px-3">Telefone</th>
                <th className="py-2 px-3">Categoria</th>
                <th className="py-2 px-3">Impacto</th>
                <th className="py-2 px-3 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {lista.map((b) => (
                <tr key={b.public_id} className="border-b">
                  <td className="py-2 px-3">{b.nome}</td>
                  <td className="py-2 px-3">{b.documento}</td>
                  <td className="py-2 px-3">{b.email}</td>
                  <td className="py-2 px-3">{b.telefone}</td>
                  <td className="py-2 px-3">{b.categoria}</td>
                  <td className="py-2 px-3">{b.impacto}</td>
                  <td className="py-2 px-3 text-right flex gap-2 justify-end">
                    <button
                      onClick={() => abrirEdicao(b)}
                      className="bg-gray-200 px-3 py-1 rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deletar(b.public_id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white w-full max-w-md rounded p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editando ? "Editar Beneficiário" : "Novo Beneficiário"}
            </h2>

            <form onSubmit={enviar}>
              <input
                name="nome"
                placeholder="Nome"
                className="border p-2 rounded w-full mb-3"
                value={form.nome}
                onChange={handle}
              />

              <input
                name="documento"
                placeholder="Documento (CPF/CNPJ)"
                className="border p-2 rounded w-full mb-3"
                value={form.documento}
                onChange={handle}
              />

              <input
                name="email"
                placeholder="Email"
                className="border p-2 rounded w-full mb-3"
                value={form.email}
                onChange={handle}
              />

              <input
                name="telefone"
                placeholder="Telefone"
                className="border p-2 rounded w-full mb-3"
                value={form.telefone}
                onChange={handle}
              />

              <input
                name="categoria"
                placeholder="Categoria"
                className="border p-2 rounded w-full mb-3"
                value={form.categoria}
                onChange={handle}
              />

              <textarea
                name="impacto"
                placeholder="Resumo do impacto gerado"
                className="border p-2 rounded w-full mb-3"
                value={form.impacto}
                onChange={handle}
              />

              <button className="bg-blue-600 text-white w-full py-2 rounded">
                Salvar
              </button>
            </form>

            <button
              onClick={() => setModal(false)}
              className="mt-4 w-full py-2 bg-gray-200 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

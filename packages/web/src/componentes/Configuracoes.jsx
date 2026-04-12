import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/enviroments";

export default function Configuracoes() {
  const [aba, setAba] = useState("usuarios");
  const [usuarios, setUsuarios] = useState([]);
  const [integracoes, setIntegracoes] = useState([]);
  const [permissoes, setPermissoes] = useState([]);

  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);

  const [formUsuario, setFormUsuario] = useState({
    nome: "",
    email: "",
    role: "USER",
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const token = localStorage.getItem("token");

      const r1 = await fetch(`${API_BASE_URL}/config/usuarios`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const r2 = await fetch(`${API_BASE_URL}/config/permissoes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const r3 = await fetch(`${API_BASE_URL}/config/integracoes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      setUsuarios(r1.ok ? await r1.json() : []);
      setPermissoes(r2.ok ? await r2.json() : []);
      setIntegracoes(r3.ok ? await r3.json() : []);
    } catch (error) {
      console.error("Erro ao carregar configurações:", error);
    }
  };

  const abrirNovo = () => {
    setEditando(null);
    setFormUsuario({ nome: "", email: "", role: "USER" });
    setModal(true);
  };

  const abrirEdicao = (u) => {
    setEditando(u.public_id);
    setFormUsuario({
      nome: u.nome || "",
      email: u.email || "",
      role: u.role || "USER",
    });
    setModal(true);
  };

  const salvarUsuario = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const metodo = editando ? "PUT" : "POST";
      const url = editando
        ? `${API_BASE_URL}/config/usuarios/${editando}`
        : `${API_BASE_URL}/config/usuarios`;

      const response = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(formUsuario),
      });

      if (!response.ok) return;

      setModal(false);
      carregarDados();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };

  const deletarUsuario = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/config/usuarios/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) return;
      carregarDados();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const handleUsuario = (e) =>
    setFormUsuario({ ...formUsuario, [e.target.name]: e.target.value });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Configurações</h1>

      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            aba === "usuarios" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setAba("usuarios")}
        >
          Usuários
        </button>

        <button
          className={`px-4 py-2 rounded ${
            aba === "permissoes" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setAba("permissoes")}
        >
          Permissões
        </button>

        <button
          className={`px-4 py-2 rounded ${
            aba === "integracoes" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setAba("integracoes")}
        >
          Integrações
        </button>
      </div>

      {aba === "usuarios" && (
        <div className="bg-white shadow rounded p-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Usuários do Sistema</h2>
            <button
              onClick={abrirNovo}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Novo Usuário
            </button>
          </div>

          {usuarios.length === 0 ? (
            <p className="text-gray-600">Nenhum usuário encontrado.</p>
          ) : (
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-3">Nome</th>
                  <th className="py-2 px-3">Email</th>
                  <th className="py-2 px-3">Cargo</th>
                  <th className="py-2 px-3 text-right"></th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.public_id} className="border-b">
                    <td className="py-2 px-3">{u.nome}</td>
                    <td className="py-2 px-3">{u.email}</td>
                    <td className="py-2 px-3">{u.role}</td>
                    <td className="py-2 px-3 text-right flex gap-2 justify-end">
                      <button
                        onClick={() => abrirEdicao(u)}
                        className="bg-gray-200 px-3 py-1 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deletarUsuario(u.public_id)}
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
      )}

      {aba === "permissoes" && (
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-bold mb-4">Permissões do Sistema</h2>
          {permissoes.length === 0 ? (
            <p className="text-gray-600">Nenhuma permissão registrada.</p>
          ) : (
            <ul className="space-y-3">
              {permissoes.map((p, i) => (
                <li key={i} className="border-b pb-2">
                  <p className="font-bold">{p.nome}</p>
                  <p className="text-gray-600">{p.descricao}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {aba === "integracoes" && (
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-bold mb-4">Integrações</h2>
          {integracoes.length === 0 ? (
            <p className="text-gray-600">Nenhuma integração ativa.</p>
          ) : (
            <ul className="space-y-3">
              {integracoes.map((i, k) => (
                <li key={k} className="border-b pb-2">
                  <p className="font-bold">{i.nome}</p>
                  <p className="text-gray-600">{i.status}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white w-full max-w-md p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editando ? "Editar Usuário" : "Novo Usuário"}
            </h2>

            <form onSubmit={salvarUsuario}>
              <input
                name="nome"
                placeholder="Nome"
                className="border p-2 rounded w-full mb-3"
                value={formUsuario.nome}
                onChange={handleUsuario}
              />

              <input
                name="email"
                placeholder="Email"
                className="border p-2 rounded w-full mb-3"
                value={formUsuario.email}
                onChange={handleUsuario}
              />

              <select
                name="role"
                className="border p-2 rounded w-full mb-3"
                value={formUsuario.role}
                onChange={handleUsuario}
              >
                <option value="USER">Usuário</option>
                <option value="ADMIN">Administrador</option>
                <option value="GESTOR">Gestor</option>
              </select>

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

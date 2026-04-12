import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/enviroments";

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    goal_amount: "",
    start_date: "",
    end_date: "",
  });

  const orgId = localStorage.getItem("orgId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch(`${API_BASE_URL}/organizations/${orgId}/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setProjects(data);
  };

  const createProject = async (e) => {
    e.preventDefault();

    await fetch(`${API_BASE_URL}/organizations/${orgId}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProject),
    });

    fetchProjects();
    alert("Projeto criado com sucesso!");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-sky-800 mb-4">
        Gerenciamento de Projetos
      </h1>

      {/* Criar projeto */}
      <form
        onSubmit={createProject}
        className="bg-white p-4 shadow rounded mb-6"
      >
        <h2 className="text-xl font-semibold mb-3">Criar Novo Projeto</h2>

        <input
          type="text"
          placeholder="Título"
          className="input"
          onChange={(e) =>
            setNewProject({ ...newProject, title: e.target.value })
          }
        />

        <textarea
          placeholder="Descrição"
          className="input"
          onChange={(e) =>
            setNewProject({ ...newProject, description: e.target.value })
          }
        ></textarea>

        <input
          type="number"
          placeholder="Meta financeira"
          className="input"
          onChange={(e) =>
            setNewProject({
              ...newProject,
              goal_amount: Number(e.target.value),
            })
          }
        />

        <div className="flex gap-4">
          <input
            type="date"
            className="input"
            onChange={(e) =>
              setNewProject({ ...newProject, start_date: e.target.value })
            }
          />
          <input
            type="date"
            className="input"
            onChange={(e) =>
              setNewProject({ ...newProject, end_date: e.target.value })
            }
          />
        </div>

        <button className="btn-primary mt-3">Criar Projeto</button>
      </form>

      {/* Listar Projetos */}
      <h2 className="text-2xl font-bold mb-2">Projetos da Organização</h2>
      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p.id} className="bg-white shadow p-4 rounded">
            <h3 className="font-semibold text-lg">{p.title}</h3>
            <p className="text-gray-700">{p.description}</p>
            <p className="text-sm mt-1">
              Meta: R$ {p.goal_amount} | Status: {p.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsManager;

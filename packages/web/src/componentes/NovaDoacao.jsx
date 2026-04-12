import { useState } from "react";
import { FaDonate } from "react-icons/fa";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

const NovaDoacao = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("PIX");
  const [organization, setOrganization] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api("/donations", "POST", {
        value,
        payment_method: paymentMethod,
        organization_id: organization,
      });

      alert("Doação registrada com sucesso!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 via-cyan-50 to-white p-6 flex flex-col">
      {/* CABEÇALHO */}
      <header className="backdrop-blur-md bg-white/80 border-b border-cyan-100 shadow-md p-4 rounded-xl mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg shadow">
            <FaDonate className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl text-sky-900 font-bold">Nova Doação</h2>
        </div>
      </header>

      {/* FORMULÁRIO */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white/70 backdrop-blur-lg border border-cyan-100 shadow-xl rounded-xl p-8"
      >
        <h3 className="text-xl text-sky-900 font-semibold mb-6">
          Preencha os dados abaixo
        </h3>

        {/* Valor */}
        <label className="block text-sky-900 font-medium mb-1">
          Valor da Doação (R$)
        </label>
        <input
          type="number"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-3 border border-cyan-200 rounded-lg shadow-sm focus:ring focus:ring-cyan-200 mb-4"
        />

        {/* Método de Pagamento */}
        <label className="block text-sky-900 font-medium mb-1">
          Método de Pagamento
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-3 border border-cyan-200 rounded-lg shadow-sm focus:ring focus:ring-cyan-200 mb-4"
        >
          <option value="PIX">PIX</option>
          <option value="TRANSFER">Transferência</option>
          <option value="CREDIT">Crédito</option>
          <option value="DEBIT">Débito</option>
        </select>

        {/* Organização */}
        <label className="block text-sky-900 font-medium mb-1">
          Organização
        </label>
        <input
          type="text"
          required
          placeholder="ID da organização"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          className="w-full p-3 border border-cyan-200 rounded-lg shadow-sm focus:ring focus:ring-cyan-200 mb-6"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-md font-semibold shadow-md hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
        >
          Enviar Doação
        </button>
      </form>
    </div>
  );
};

export default NovaDoacao;

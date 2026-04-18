import axios from "axios";

const urlBase = "https://ap-orienta-servi-o.vercel.app/tarefas";

export async function getTarefas() {
  const response = await axios.get(urlBase);
  return response.data;
}

export async function adicionarTarefa(novaTarefa) {
  const response = await axios.post(urlBase, novaTarefa, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export async function atualizarTarefa(id, dadosAtualizados) {
  const response = await axios.put(`${urlBase}/${id}`, dadosAtualizados, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export async function deletarTarefa(id) {
  const response = await axios.delete(`${urlBase}/${id}`);
  return response.data;
}
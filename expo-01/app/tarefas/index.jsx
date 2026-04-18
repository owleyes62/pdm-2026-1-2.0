import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTarefas, adicionarTarefa, atualizarTarefa, deletarTarefa } from "@/neon";
import TarefaCard from "../components/TarefaCard";
import AddTarefaForm from "../components/AddTarefaForm";

export default function TarefasPage() {
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ["tarefas"],
    queryFn: getTarefas,
  });

  const adicionarMutation = useMutation({
    mutationFn: adicionarTarefa,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tarefas"] }),
  });

  const atualizarMutation = useMutation({
    mutationFn: ({ id, dados }) => atualizarTarefa(id, dados),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tarefas"] }),
  });

  const deletarMutation = useMutation({
    mutationFn: deletarTarefa,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tarefas"] }),
  });

  const pendentes = data?.filter((t) => !t.concluida) ?? [];
  const concluidas = data?.filter((t) => t.concluida) ?? [];

  return (
    <View style={styles.container}>
      <AddTarefaForm
        onAdicionar={(dados) => adicionarMutation.mutate(dados)}
        isLoading={adicionarMutation.isPending}
      />

      {isFetching && <ActivityIndicator size="large" color="#4A90E2" style={{ marginBottom: 10 }} />}

      <FlatList
        data={[
          { type: "header", title: `Pendentes (${pendentes.length})` },
          ...pendentes.map((t) => ({ type: "tarefa", ...t })),
          { type: "header", title: `Concluídas (${concluidas.length})` },
          ...concluidas.map((t) => ({ type: "tarefa", ...t })),
        ]}
        keyExtractor={(item, index) =>
          item.type === "header" ? `header-${index}` : item.objectId
        }
        renderItem={({ item }) => {
          if (item.type === "header") {
            return <Text style={styles.sectionTitle}>{item.title}</Text>;
          }
          return (
            <TarefaCard
              tarefa={item}
              onToggle={(id, value) =>
                atualizarMutation.mutate({ id, dados: { concluida: value } })
              }
              onDelete={(id) => deletarMutation.mutate(id)}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    padding: 16,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 4,
  },
});
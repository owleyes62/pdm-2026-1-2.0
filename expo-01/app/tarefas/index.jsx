import { useState } from "react";
import { Link } from "expo-router";
import { Pressable, Switch } from "react-native";
import { atualizarTarefa, deletarTarefa, adicionarTarefa, getTarefas } from "@/neon";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Route } from "expo-router/build/Route";

export default function TarefasPage() {
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery({
    queryKey: ["tarefas"],
    queryFn: getTarefas,
  });
  const mutation = useMutation({
    mutationFn: adicionarTarefa,
    onSuccess: (data) => {
      console.log("SALVOU:", data);
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
    },
    onError: (error) => {
      console.log("ERRO:", error);
    },
  });
  const [descricao, setDescricao] = useState("");

  async function handleAdicionarTarefaPress() {
  console.log("VALOR DIGITADO:", descricao);

  if (!descricao || descricao.trim() === "") {
    Alert.alert("Erro", "Digite uma descrição válida");
    return;
  }

  mutation.mutate({
    descricao: String(descricao),
    concluida: false,
  });

  setDescricao("");
}

  const atualizarMutation = useMutation({
  mutationFn: ({ id, dados }) => atualizarTarefa(id, dados),
  onSuccess: (data) => {
    console.log("ATUALIZOU:", data);
    queryClient.invalidateQueries({ queryKey: ["tarefas"] });
  },
});

const deletarMutation = useMutation({
  mutationFn: deletarTarefa,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["tarefas"] });
  },
});

  return (
    <View style={styles.container}>
      {(isFetching || mutation.isPending) && <ActivityIndicator size="large" />}
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <Button
        title="Adicionar Tarefa"
        onPress={handleAdicionarTarefaPress}
        disabled={mutation.isPending}
      />
      <View style={styles.hr} />
      <View style={styles.tasksContainer}>
                {data?.map((t) => (
          <View key={t.objectId} style={styles.taskItem}>
            <Switch
              value={t.concluida}
              onValueChange={(value) =>
                atualizarMutation.mutate({
                  id: t.objectId,
                  dados: { concluida: value },
                })
              }
            />

            <Link href={`/tarefas/${t.objectId}`} asChild>
              <Pressable>
                <Text style={t.concluida && styles.strikethroughText}>
                  {t.descricao}
                </Text>
              </Pressable>
            </Link>

            <Button
              title="X"
              onPress={() => deletarMutation.mutate(t.objectId)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  tasksContainer: {
    paddingLeft: 15,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    width: "90%",
    marginBottom: 5,
  },
  hr: {
    height: 1,
    backgroundColor: "black",
    width: "95%",
    marginVertical: 10,
  },
  strikethroughText: {
    textDecorationLine: "line-through", // Key property for strikethrough
    textDecorationStyle: "solid", // Optional: Style of the line
    textDecorationColor: "red", // Optional: Color of the line (iOS only)
    // Other styles like fontSize, fontWeight, color can also be applied
  },
    taskItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 5,
  },
});

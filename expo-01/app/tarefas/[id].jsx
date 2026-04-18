import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, TextInput, Switch } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as Linking from "expo-linking";
import * as Clipboard from "expo-clipboard";
import { getTarefaById, atualizarTarefa } from "@/neon";
import { useState, useEffect } from "react";

export default function TarefaDetalhe() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [editando, setEditando] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [concluida, setConcluida] = useState(false);

  const { data: tarefa, isLoading } = useQuery({
    queryKey: ["tarefa", id],
    queryFn: () => getTarefaById(id),
  });

  useEffect(() => {
    if (tarefa) {
      setTitulo(tarefa.titulo);
      setDescricao(tarefa.descricao);
      setConcluida(tarefa.concluida);
    }
  }, [tarefa]);

  const atualizarMutation = useMutation({
    mutationFn: (dados) => atualizarTarefa(id, dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefa", id] });
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
      setEditando(false);
      Alert.alert("Sucesso!", "Tarefa atualizada com sucesso.");
    },
    onError: () => {
      Alert.alert("Erro", "Não foi possível atualizar a tarefa.");
    },
  });

  const handleSalvar = () => {
    if (!titulo.trim()) {
      Alert.alert("Erro", "O título é obrigatório.");
      return;
    }
    if (!descricao.trim()) {
      Alert.alert("Erro", "A descrição é obrigatória.");
      return;
    }
    atualizarMutation.mutate({ titulo: titulo.trim(), descricao: descricao.trim(), concluida });
  };

  const handleCancelar = () => {
    setTitulo(tarefa.titulo);
    setDescricao(tarefa.descricao);
    setConcluida(tarefa.concluida);
    setEditando(false);
  };

  const handleCompartilhar = async () => {
    const url = Linking.createURL(`expo01://tarefas/${id}`);
    await Clipboard.setStringAsync(url);
    Alert.alert("Copiado!", "Link da tarefa copiado para a área de transferência.");
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  if (!tarefa) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Tarefa não encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        {/* Badge de status */}
        <View style={[styles.badge, concluida ? styles.badgeConcluida : styles.badgePendente]}>
          <Text style={styles.badgeText}>
            {concluida ? "✅ Concluída" : "🕐 Pendente"}
          </Text>
        </View>

        {/* Campos editáveis ou somente leitura */}
        {editando ? (
          <>
            <Text style={styles.fieldLabel}>Título</Text>
            <TextInput
              style={styles.input}
              value={titulo}
              onChangeText={setTitulo}
              placeholder="Título"
            />

            <Text style={styles.fieldLabel}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Descrição"
              multiline
            />

            <View style={styles.switchRow}>
              <Text style={styles.fieldLabel}>Concluída</Text>
              <Switch
                value={concluida}
                onValueChange={setConcluida}
                trackColor={{ false: "#ccc", true: "#4A90E2" }}
              />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.titulo}>{tarefa.titulo}</Text>
            <Text style={styles.descricao}>{tarefa.descricao}</Text>

            <View style={styles.divider} />

            <Text style={styles.meta}>🆔 {tarefa.objectId}</Text>
            <Text style={styles.meta}>
              📅 Criada em: {new Date(tarefa.createdAt).toLocaleDateString("pt-BR")}
            </Text>
          </>
        )}
      </View>

      {/* Botões de ação */}
      {editando ? (
        <>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSalvar}
            disabled={atualizarMutation.isPending}
          >
            <Text style={styles.saveButtonText}>
              {atualizarMutation.isPending ? "Salvando..." : "💾 Salvar Alterações"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelar}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.editButton} onPress={() => setEditando(true)}>
            <Text style={styles.editButtonText}>✏️ Editar Tarefa</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareButton} onPress={handleCompartilhar}>
            <Text style={styles.shareButtonText}>🔗 Compartilhar Tarefa</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    padding: 20,
    paddingTop: 30,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
  },
  errorText: {
    fontSize: 16,
    color: "#ef4444",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 14,
  },
  badgeConcluida: { backgroundColor: "#dcfce7" },
  badgePendente: { backgroundColor: "#fef9c3" },
  badgeText: { fontSize: 13, fontWeight: "600" },
  titulo: { fontSize: 22, fontWeight: "800", color: "#1a1a1a", marginBottom: 8 },
  descricao: { fontSize: 15, color: "#6b7280", lineHeight: 22 },
  divider: { height: 1, backgroundColor: "#e5e7eb", marginVertical: 16 },
  meta: { fontSize: 13, color: "#9ca3af", marginBottom: 4 },
  fieldLabel: { fontSize: 13, fontWeight: "600", color: "#6b7280", marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: "#1a1a1a",
    backgroundColor: "#f9fafb",
    marginBottom: 12,
  },
  inputMultiline: { minHeight: 80, textAlignVertical: "top" },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  editButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  editButtonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  saveButton: {
    backgroundColor: "#22c55e",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  saveButtonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  cancelButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 10,
  },
  cancelButtonText: { color: "#ef4444", fontWeight: "700", fontSize: 15 },
  shareButton: {
    backgroundColor: "#f0f4f8",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  shareButtonText: { color: "#4A90E2", fontWeight: "700", fontSize: 15 },
  backButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  backButtonText: { color: "#4A90E2", fontWeight: "700", fontSize: 15 },
});
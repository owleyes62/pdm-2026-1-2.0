import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function TarefaCard({ tarefa, onToggle, onDelete }) {
  return (
    <View style={styles.card}>
      <Switch
        value={tarefa.concluida}
        onValueChange={(value) => onToggle(tarefa.objectId, value)}
        trackColor={{ false: "#ccc", true: "#4A90E2" }}
        thumbColor={tarefa.concluida ? "#fff" : "#fff"}
      />

      <Link href={`/tarefas/${tarefa.objectId}`} asChild>
        <TouchableOpacity style={styles.textContainer}>
          <Text style={styles.titulo}>{tarefa.titulo}</Text>
          <Text
            style={[styles.descricao, tarefa.concluida && styles.strikethrough]}
            numberOfLines={1}
          >
            {tarefa.descricao}
          </Text>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(tarefa.objectId)}>
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    gap: 10,
  },
  textContainer: {
    flex: 1,
  },
  titulo: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  descricao: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  strikethrough: {
    textDecorationLine: "line-through",
    color: "#bbb",
  },
  deleteButton: {
    backgroundColor: "#fee2e2",
    borderRadius: 8,
    padding: 8,
  },
  deleteText: {
    color: "#ef4444",
    fontWeight: "bold",
    fontSize: 13,
  },
});
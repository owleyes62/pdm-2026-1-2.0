import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function AddTarefaForm({ onAdicionar, isLoading }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  function handleSubmit() {
    if (!titulo.trim()) {
      Alert.alert("Erro", "O título é obrigatório");
      return;
    }
    if (!descricao.trim()) {
      Alert.alert("Erro", "A descrição é obrigatória");
      return;
    }
    onAdicionar({ titulo: titulo.trim(), descricao: descricao.trim(), concluida: false });
    setTitulo("");
    setDescricao("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nova Tarefa</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor="#aaa"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        placeholderTextColor="#aaa"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Adicionando..." : "+ Adicionar Tarefa"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: "#1a1a1a",
    marginBottom: 10,
    backgroundColor: "#f9fafb",
  },
  button: {
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#93c5fd",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});
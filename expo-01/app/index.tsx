import { Text, View, StyleSheet, TouchableOpacity, Button } from "react-native";
import { Link } from "expo-router";
import * as Linking from 'expo-linking';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, Turma 👋</Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          Bem-vindo ao app de tarefas
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Link href="/about" asChild>
          <TouchableOpacity style={styles.buttonSecondary}>
            <Text style={styles.buttonText}>Sobre</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/tarefas" asChild>
          <TouchableOpacity style={styles.buttonPrimary}>
            <Text style={styles.buttonText}>Tarefas</Text>
          </TouchableOpacity>
        </Link>

        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    width: "100%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  cardText: {
    fontSize: 16,
    textAlign: "center",
  },

  buttonsContainer: {
    width: "100%",
    gap: 10,
  },

  buttonPrimary: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonSecondary: {
    backgroundColor: "#6c757d",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
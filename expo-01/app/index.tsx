import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Olá, Turma!</Text>
      <View style={{ width: 100, height: 50, backgroundColor: "blue" }} />
      <View style={{ width: 100, height: 100, backgroundColor: "red" }} />
      <Link href="/about">About</Link>
      <Link href="/tarefas">Tarefas</Link>
    </View>
  );
}

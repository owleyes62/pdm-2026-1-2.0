import DraggableItem from "@/components/DraggableItem";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function GostoNaoGosto() {
  const items = ["Maçã", "Banana", "Laranja", "Uva", "Abacate", "Pera"];

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>Arraste para Gosto ou Não Gosto</Text>

        {/* Área de itens arrastáveis */}
        <View style={styles.dragArea}>
          {items.map((item, index) => (
            <DraggableItem key={index} item={item} />
          ))}
        </View>

        {/* Drop Zones - Duas colunas */}
        <View style={styles.dropZones}>
          <View style={styles.dropZone}>
            <Text style={styles.zoneTitle}>👍 Gosto</Text>
            {/* TODO: Implementar lógica de drop zone aqui.
                - Criar ref para esta View
                - Usar measure() para obter posição e tamanho absolutos (pageX, pageY, width, height)
                - Compartilhar bounds das zones com DraggableItems via Context ou props
                - Detectar quando item é solto sobrepondo e animar item para dentro da zone,
                  atualizar estado para mostrar item na zone */}
          </View>
          <View style={[styles.dropZone, { backgroundColor: "#FFE66D" }]}>
            <Text style={styles.zoneTitle}>👎 Não Gosto</Text>
            {/* Mesma lógica acima */}
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  safeArea: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  dragArea: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 40,
    marginBottom: 40,
  },
  dropZones: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  dropZone: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#A8E6CF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  zoneTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
import DraggableItem from "@/components/DraggableItem";
import DropZoneContext, {
  DraggingState,
  ZoneBounds,
} from "@/components/DropZoneContext";
import { useCallback, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DraggingOverlay from "@/components/DraggingOverlay";

export default function GostoNaoGosto() {
  const allItems = ["Maçã", "Banana", "Laranja", "Uva", "Abacate", "Pera"];

  const [zones, setZones] = useState<ZoneBounds[]>([]);
  const [dragging, setDragging] = useState<DraggingState>(null);
  const [itemZone, setItemZone] = useState<Record<string, string | null>>(
    Object.fromEntries(allItems.map((i) => [i, null]))
  );

  const gostoRef = useRef<View>(null);
  const naoGostoRef = useRef<View>(null);
  const measured = useRef<ZoneBounds[]>([]);

  const measureZone = useCallback(
    (key: string, ref: React.RefObject<View | null>) => {
      ref.current?.measure((fx, fy, width, height, px, py) => {
        const zone: ZoneBounds = {
          key,
          left: px,
          top: py,
          right: px + width,
          bottom: py + height,
          centerX: px + width / 2,
          centerY: py + height / 2,
        };
        measured.current = [
          ...measured.current.filter((z) => z.key !== key),
          zone,
        ];
        setZones([...measured.current]);
      });
    },
    []
  );

  const onDrop = useCallback((item: string, zoneKey: string | null) => {
    setItemZone((prev) => ({ ...prev, [item]: zoneKey }));
  }, []);

  const pendingItems = allItems.filter((i) => itemZone[i] === null);
  const gostoItems = allItems.filter((i) => itemZone[i] === "gosto");
  const naoGostoItems = allItems.filter((i) => itemZone[i] === "nao_gosto");

  return (
    <DropZoneContext.Provider value={{ zones, onDrop, dragging, setDragging }}>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.title}>Arraste para Gosto ou Não Gosto</Text>

          <View style={styles.dragArea}>
            {pendingItems.map((item) => (
              <DraggableItem key={item} item={item} />
            ))}
          </View>

          <View style={styles.dropZones}>
            <View
              ref={gostoRef}
              style={styles.dropZone}
              onLayout={() => measureZone("gosto", gostoRef)}
            >
              <Text style={styles.zoneTitle}>👍 Gosto</Text>
              <View style={styles.zoneItems}>
                {gostoItems.map((item) => (
                  <DraggableItem key={item} item={item} />
                ))}
              </View>
            </View>

            <View
              ref={naoGostoRef}
              style={[styles.dropZone, { backgroundColor: "#FFE66D" }]}
              onLayout={() => measureZone("nao_gosto", naoGostoRef)}
            >
              <Text style={styles.zoneTitle}>👎 Não Gosto</Text>
              <View style={styles.zoneItems}>
                {naoGostoItems.map((item) => (
                  <DraggableItem key={item} item={item} />
                ))}
              </View>
            </View>
          </View>
        </SafeAreaView>

        {/* Overlay: renderiza o clone DENTRO do GestureHandlerRootView */}
        <DraggingOverlay />
      </GestureHandlerRootView>
    </DropZoneContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  safeArea: { flex: 1 },
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
    minHeight: 100,
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
    alignItems: "center",
    paddingTop: 16,
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
    marginBottom: 8,
  },
  zoneItems: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
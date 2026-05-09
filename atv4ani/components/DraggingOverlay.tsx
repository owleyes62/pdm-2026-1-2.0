import { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import DropZoneContext from "@/components/DropZoneContext";

export default function DraggingOverlay() {
  const { dragging } = useContext(DropZoneContext);

  if (!dragging) return null;

  return (
    <Animated.View
      style={[
        styles.item,
        {
          position: "absolute",
          left: dragging.x - 40,
          top: dragging.y - 40,
          pointerEvents: "none",
        },
      ]}
    >
      <Text style={styles.itemText}>{dragging.item}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: 80,
    height: 80,
    backgroundColor: "#FF6B6B",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 999,
    zIndex: 999,
  },
  itemText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
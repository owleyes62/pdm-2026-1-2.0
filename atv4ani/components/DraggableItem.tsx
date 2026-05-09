import { useRef, useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import DropZoneContext from "@/components/DropZoneContext";

export function DraggableItem({ item }: { item: string }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const initialX = useSharedValue(0);
  const initialY = useSharedValue(0);
  const itemRef = useRef<Animated.View>(null);

  const { zones, onDrop, dragging, setDragging } = useContext(DropZoneContext);

  const isDraggingThis = dragging?.item === item;

  const startDragging = () => {
    itemRef.current?.measureInWindow((x, y, width, height) => {
      initialX.value = x + width / 2;
      initialY.value = y + height / 2;
      setDragging({ item, x: initialX.value, y: initialY.value });
    });
  };

  const updateDragging = (tx: number, ty: number) => {
    setDragging({ item, x: initialX.value + tx, y: initialY.value + ty });
  };

  const stopDragging = (tx: number, ty: number) => {
    const finalX = initialX.value + tx;
    const finalY = initialY.value + ty;

    let matched = null;
    for (const z of zones || []) {
      if (
        finalX > z.left &&
        finalX < z.right &&
        finalY > z.top &&
        finalY < z.bottom
      ) {
        matched = z;
        break;
      }
    }

    setDragging(null);
    onDrop?.(item, matched ? matched.key : null);
  };

  const gesture = Gesture.Pan()
    .onStart(() => {
      runOnJS(startDragging)();
    })
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
      runOnJS(updateDragging)(e.translationX, e.translationY);
    })
    .onEnd((e) => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      runOnJS(stopDragging)(e.translationX, e.translationY);
    });

  const originalStyle = useAnimatedStyle(() => ({
    opacity: isDraggingThis ? 0 : 1,
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View ref={itemRef} style={[styles.item, originalStyle]}>
        <Text style={styles.itemText}>{item}</Text>
      </Animated.View>
    </GestureDetector>
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
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  itemText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default DraggableItem;
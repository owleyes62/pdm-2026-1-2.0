import React from "react";

export type ZoneBounds = {
  key: string;
  left: number;
  top: number;
  right: number;
  bottom: number;
  centerX: number;
  centerY: number;
};

export type DraggingState = {
  item: string;
  x: number;
  y: number;
} | null;

export type DropZoneContextType = {
  zones: ZoneBounds[];
  onDrop?: (item: string, zoneKey: string | null) => void;
  dragging: DraggingState;
  setDragging: (state: DraggingState) => void;
};

export const DropZoneContext = React.createContext<DropZoneContextType>({
  zones: [],
  dragging: null,
  setDragging: () => {},
});

export default DropZoneContext;

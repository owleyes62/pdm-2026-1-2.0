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

export type DropZoneContextType = {
  zones: ZoneBounds[];
  onDrop?: (item: string, zoneKey: string) => void;
};

export const DropZoneContext = React.createContext<DropZoneContextType>({
  zones: [],
});

export default DropZoneContext;

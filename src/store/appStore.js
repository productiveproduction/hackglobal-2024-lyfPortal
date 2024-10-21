import { create } from "zustand";

export const useAppStore = create((set) => ({
  selectedDevice: 0,
  devices: [],
  currentPage: "messages",
  rasterSources: [],
  commandPaletteOpen: false,
  darkMode:
    localStorage.getItem("theme-dark") !== null
      ? localStorage.getItem("theme-dark") === "true"
      : window.matchMedia("(prefers-color-scheme: dark)").matches,
  accent: "orange",
  connectDialogOpen: false,
  nodeNumToBeRemoved: 0,

  setRasterSources: (sources) => {
    set({ rasterSources: sources });
  },
  addRasterSource: (source) => {
    set((state) => ({ rasterSources: [...state.rasterSources, source] }));
  },
  removeRasterSource: (index) => {
    set((state) => ({
      rasterSources: state.rasterSources.filter((_, i) => i !== index),
    }));
  },
  setSelectedDevice: (deviceId) =>
    set(() => ({
      selectedDevice: deviceId,
    })),
  addDevice: (device) =>
    set((state) => ({
      devices: [...state.devices, device],
    })),
  removeDevice: (deviceId) =>
    set((state) => ({
      devices: state.devices.filter((device) => device.id !== deviceId),
    })),
  setCommandPaletteOpen: (open) => {
    set({ commandPaletteOpen: open });
  },
  setDarkMode: (enabled) => {
    localStorage.setItem("theme-dark", enabled.toString());
    set({ darkMode: enabled });
  },
  setNodeNumToBeRemoved: (nodeNum) =>
    set((state) => ({
      nodeNumToBeRemoved: nodeNum,
    })),
  setAccent(color) {
    set({ accent: color });
  },
  setConnectDialogOpen: (open) => {
    set({ connectDialogOpen: open });
  },
}));

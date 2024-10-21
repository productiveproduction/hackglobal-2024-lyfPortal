import { create } from "zustand";
import { createContext, useContext } from 'react';

export const useDeviceStore = create((set, get) => ({
  devices: new Map(),
  remoteDevices: new Map(),
  addDevice: (id) => {
    const device = { id, num: get().devices.size + 1 };
    set((state) => ({
      devices: new Map(state.devices.set(id, device)),
    }));
    return device;
  },
  removeDevice: (id) => {
    set((state) => ({
      devices: new Map(state.devices).delete(id), 
    
}));
  },
  getDevices: () => Array.from(get().devices.values()),
  getDevice: (id) => get().devices.get(id),
}));


export const DeviceContext = createContext(undefined);

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return context;
};

import { create } from 'zustand';

const useTablistStore = create((set) => ({
  activeIndex: 0,
  setActiveIndex: (index) => set({ activeIndex: index }),
}));

export { useTablistStore };

import { create } from "zustand";

interface State {
  showEditTask: boolean;
  showSavedTaskboards: boolean;
  setShowEditTask: (value: boolean) => void;
  setShowSavedTaskboards: (value: boolean) => void;
}

const useConditionalViewsStore = create<State>()((set) => ({
  showEditTask: false,
  showSavedTaskboards: false,
  setShowEditTask: (value: boolean) => set({ showEditTask: value }),
  setShowSavedTaskboards: (value: boolean) =>
    set({ showSavedTaskboards: value }),
}));

export default useConditionalViewsStore;

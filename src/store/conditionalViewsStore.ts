import { create } from "zustand";

interface State {
  showEditTask: boolean;
  showNewTask: boolean;
  showEditTaskboard: boolean;
  showSavedTaskboards: boolean;
  setShowEditTask: (value: boolean) => void;
  setShowNewTask: (value: boolean) => void;
  setShowEditTaskboard: (value: boolean) => void;
  setShowSavedTaskboards: (value: boolean) => void;
}

const useConditionalViewsStore = create<State>()((set) => ({
  showEditTask: false,
  showNewTask: false,
  showEditTaskboard: false,
  showSavedTaskboards: false,
  setShowEditTask: (value: boolean) => set({ showEditTask: value }),
  setShowNewTask: (value: boolean) => set({ showNewTask: value }),
  setShowEditTaskboard: (value: boolean) => set({ showEditTaskboard: value }),
  setShowSavedTaskboards: (value: boolean) =>
    set({ showSavedTaskboards: value }),
}));

export default useConditionalViewsStore;

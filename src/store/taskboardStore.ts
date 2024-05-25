import { create } from "zustand";
import { ITaskWithId } from "../types/Task.types";

interface State {
  taskboardsFromLocalStorage: string[];
  activeTaskboardIndex: number;
  activeTask: ITaskWithId | null;
  setTaskboardsFromLocalStorage: (boards: string[]) => void;
  setActiveTaskboardIndex: (index: number) => void;
  setActiveTask: (newTask: ITaskWithId) => void;
}

const useTaskboardStore = create<State>()((set) => ({
  taskboardsFromLocalStorage: [],
  activeTaskboardIndex: 0,
  activeTask: null,

  setTaskboardsFromLocalStorage: (boards: string[]) =>
    set({ taskboardsFromLocalStorage: boards }),

  setActiveTaskboardIndex: (index: number) =>
    set({ activeTaskboardIndex: index }),

  setActiveTask: (newTask: ITaskWithId) => set({ activeTask: newTask }),
}));

export default useTaskboardStore;

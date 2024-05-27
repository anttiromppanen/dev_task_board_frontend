import { create } from "zustand";
import { IconType, StatusType } from "../types/Task.types";

interface State {
  nameInputValue: string;
  descriptionInputValue: string;
  iconInputValue: IconType;
  statusInputValue: StatusType;
  setNameInputValue: (newName: string) => void;
  setDescriptionInputValue: (newDesc: string) => void;
  setIconInputValue: (newIcon: IconType) => void;
  setStatusInputValue: (newStatus: StatusType) => void;
}

const useTaskFormStore = create<State>()((set) => ({
  nameInputValue: "",
  descriptionInputValue: "",
  iconInputValue: "Clock",
  statusInputValue: "In progress",

  setNameInputValue: (newName: string) => set({ nameInputValue: newName }),

  setIconInputValue: (newIcon: IconType) => set({ iconInputValue: newIcon }),

  setDescriptionInputValue: (newDesc: string) =>
    set({ descriptionInputValue: newDesc }),

  setStatusInputValue: (newStatus: StatusType) =>
    set({ statusInputValue: newStatus }),
}));

export default useTaskFormStore;

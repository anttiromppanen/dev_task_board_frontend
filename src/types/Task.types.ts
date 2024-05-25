// StatusType values must match db schema field status values
export type StatusType = "In progress" | "Completed" | "Won't do" | "Todo";
export type StatusWithoutTodo = Exclude<StatusType, "Todo">;

// IconType values must match db schema field icon values
export type IconType =
  | "Clock"
  | "AcademicCap"
  | "Camera"
  | "CalendarDays"
  | "CurrencyEuro"
  | "PresentationChart";

// Task without id
export interface ITask {
  name: string;
  description: string;
  icon: IconType;
  status: StatusType;
}

export interface ITaskWithId extends ITask {
  id: string;
}

// Used for typing Task variant styles
export interface ITaskVariantStyles {
  container: string;
  leftImage: string;
  rightImage: string;
}

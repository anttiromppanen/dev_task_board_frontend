import { Dispatch, SetStateAction } from "react";
import Container from "./Container";
import Header from "./Header";
import TasksSection from "./Tasks/TasksSection";
import { ITaskWithId } from "../types/Task.types";

export interface ITaskboard {
  id: string;
  name: string;
  description: string;
  tasks: ITaskWithId[];
}

function Taskboard() {
  return (
    <Container>
      <Header />
      <TasksSection />
      <button
        type="button"
        className="mt-10 h-16 w-full rounded-xl bg-green-500"
      >
        Add to localstorage
      </button>
    </Container>
  );
}

export default Taskboard;

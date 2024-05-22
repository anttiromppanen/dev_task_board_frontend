import { Dispatch, SetStateAction } from "react";
import Container from "./Container";
import Header from "./Header";
import { ITaskWithId } from "./Tasks/Task";
import TasksSection from "./Tasks/TasksSection";

export interface ITaskboard {
  id: string;
  name: string;
  description: string;
  tasks: ITaskWithId[];
}

function Taskboard({
  currentTaskboard,
  setActiveTask,
  setShowEditTask,
  taskboardIsLoading,
  taskboardIsError,
}: {
  currentTaskboard: ITaskboard;
  setActiveTask: Dispatch<SetStateAction<ITaskWithId | null>>;
  setShowEditTask: Dispatch<SetStateAction<boolean>>;
  taskboardIsLoading: boolean;
  taskboardIsError: boolean;
}) {
  return (
    <Container>
      <Header
        id={currentTaskboard && currentTaskboard.id}
        name={currentTaskboard && currentTaskboard.name}
        description={currentTaskboard && currentTaskboard.description}
        isLoading={taskboardIsLoading}
        isError={taskboardIsError}
      />
      <TasksSection
        tasks={currentTaskboard && currentTaskboard.tasks}
        setActiveTask={setActiveTask}
        setShowEditTask={setShowEditTask}
        isLoading={taskboardIsLoading}
        isError={taskboardIsError}
      />
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

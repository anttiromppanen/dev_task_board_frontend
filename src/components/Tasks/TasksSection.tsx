import { Dispatch, SetStateAction } from "react";
import Task, { ITaskWithId } from "./Task";

function TasksSection({
  tasks,
  setActiveTask,
  setShowEditTask,
  isLoading,
  isError,
}: {
  tasks: ITaskWithId[];
  setActiveTask: Dispatch<SetStateAction<ITaskWithId | null>>;
  setShowEditTask: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  isError: boolean;
}) {
  const handleTaskClick = (id: string) => {
    const findTask = tasks.find((x) => x.id === id) as ITaskWithId;

    if (!findTask) return;

    setShowEditTask(true);
    setActiveTask(findTask);
  };

  return (
    <section className="mt-10 flex flex-col gap-y-5">
      {isLoading && <h1>Loading tasks...</h1>}
      {isError && <h1>Error...</h1>}
      {tasks &&
        tasks.map(({ id, name, description, icon, status }: ITaskWithId) => (
          <Task
            key={id}
            name={name}
            description={description}
            icon={icon}
            status={status}
            handleClick={() => handleTaskClick(id)}
          />
        ))}
    </section>
  );
}

export default TasksSection;

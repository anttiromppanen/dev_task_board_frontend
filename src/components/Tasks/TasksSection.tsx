import useTaskboards from "../../hooks/useTaskboards";
import useConditionalViewsStore from "../../store/conditionalViewsStore";
import useTaskboardStore from "../../store/taskboardStore";
import { ITaskWithId } from "../../types/Task.types";
import NewTaskButton from "./NewTaskButton";
import Task from "./Task";

function TasksSection() {
  const { setShowEditTask } = useConditionalViewsStore((state) => state);
  const { taskboardsAreLoading, taskboardsIsError, taskboardsFromQuery } =
    useTaskboards();
  const { activeTaskboardIndex } = useTaskboardStore((state) => state);
  const { setActiveTask } = useTaskboardStore((state) => state);
  const currentTaskboard =
    taskboardsFromQuery && taskboardsFromQuery[activeTaskboardIndex];

  // opens up task edit view if task found
  const handleTaskClick = (id: string) => {
    const findTask = currentTaskboard.tasks.find(
      (x: ITaskWithId) => x.id === id,
    );

    if (!findTask) return;
    setShowEditTask(true);
    setActiveTask(findTask);
  };

  return (
    <section className="mb-12 mt-10 flex flex-col gap-y-5">
      {taskboardsAreLoading && <h1>Loading tasks...</h1>}
      {taskboardsIsError && <h1>Error...</h1>}
      {currentTaskboard &&
        currentTaskboard.tasks.map(
          ({ id, name, description, icon, status }: ITaskWithId) => (
            <Task
              key={id}
              name={name}
              description={description}
              icon={icon}
              status={status}
              handleClick={() => handleTaskClick(id)}
            />
          ),
        )}
      <NewTaskButton />
    </section>
  );
}

export default TasksSection;

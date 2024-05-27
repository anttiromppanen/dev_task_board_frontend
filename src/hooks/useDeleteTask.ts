import { FormEventHandler } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteTask } from "../services/task_service";
import useConditionalViewsStore from "../store/conditionalViewsStore";
import useTaskFormStore from "../store/taskFormStore";
import useTaskboardStore from "../store/taskboardStore";
import useTaskboards from "./useTaskboards";

const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { taskboardsFromQuery } = useTaskboards();
  const { activeTask } = useTaskboardStore((state) => state);
  const { activeTaskboardIndex } = useTaskboardStore((state) => state);
  const { setShowEditTask } = useConditionalViewsStore((state) => state);

  const { setNameInputValue } = useTaskFormStore((state) => state);
  const { setDescriptionInputValue } = useTaskFormStore((state) => state);
  const { setIconInputValue } = useTaskFormStore((state) => state);
  const { setStatusInputValue } = useTaskFormStore((state) => state);

  const currentTaskboard =
    taskboardsFromQuery && taskboardsFromQuery[activeTaskboardIndex];

  const { mutateAsync, isLoading: isLoadingDelete } = useMutation({
    mutationFn: ({
      taskboardId,
      taskId,
    }: {
      taskboardId: string;
      taskId: string;
    }) => deleteTask(taskboardId, taskId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["taskboards"] }),
  });

  const handleDelete: FormEventHandler<HTMLButtonElement> = async () => {
    if (!window.confirm(`Do you want to delete the task ${activeTask?.name}?`))
      return undefined;

    await mutateAsync({
      taskboardId: currentTaskboard?.id || "",
      taskId: activeTask?.id || "",
    });

    setNameInputValue("");
    setDescriptionInputValue("");
    setIconInputValue("Clock");
    setStatusInputValue("In progress");

    setShowEditTask(false);

    return undefined;
  };

  return {
    isLoadingDelete,
    handleDelete,
  };
};

export default useDeleteTask;

import { FormEventHandler, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateTask } from "../services/task_service";
import useTaskFormStore from "../store/taskFormStore";
import useTaskboardStore from "../store/taskboardStore";
import { ITask } from "../types/Task.types";
import useNotification from "./useNotification";
import useTaskboards from "./useTaskboards";

const useEditTask = () => {
  const queryClient = useQueryClient();

  const { taskboardsFromQuery } = useTaskboards();
  const { activeTask } = useTaskboardStore((state) => state);
  const { activeTaskboardIndex } = useTaskboardStore((state) => state);

  const { setNameInputValue } = useTaskFormStore((state) => state);
  const { setDescriptionInputValue } = useTaskFormStore((state) => state);
  const { setIconInputValue } = useTaskFormStore((state) => state);
  const { setStatusInputValue } = useTaskFormStore((state) => state);

  useEffect(() => {
    setNameInputValue(activeTask?.name || "");
    setDescriptionInputValue(activeTask?.description || "");
    setIconInputValue(activeTask?.icon || "Clock");
    setStatusInputValue(activeTask?.status || "In progress");
  }, [
    activeTask,
    setNameInputValue,
    setDescriptionInputValue,
    setIconInputValue,
    setStatusInputValue,
  ]);

  const { nameInputValue } = useTaskFormStore((state) => state);
  const { descriptionInputValue } = useTaskFormStore((state) => state);
  const { iconInputValue } = useTaskFormStore((state) => state);
  const { statusInputValue } = useTaskFormStore((state) => state);

  const {
    notificationText,
    setNotificationText,
    setShowNotification,
    showNotification,
  } = useNotification();

  // active taskboard selected by user
  const currentTaskboard =
    taskboardsFromQuery && taskboardsFromQuery[activeTaskboardIndex];

  const {
    mutateAsync: updateTaskAsync,
    isLoading: isLoadingEdit,
    isError: isErrorEdit,
    error: errorEdit,
  } = useMutation({
    mutationFn: ({
      taskboardId,
      taskId,
      taskParams,
    }: {
      taskboardId: string;
      taskId: string;
      taskParams: ITask;
    }) => updateTask(taskboardId, taskId, taskParams),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["taskboards"] }),
    onError: () => setShowNotification(true),
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const newTask: ITask = {
      name: nameInputValue || "",
      description: descriptionInputValue || "",
      icon: iconInputValue || "",
      status: statusInputValue || "",
    };

    await updateTaskAsync({
      taskboardId: currentTaskboard?.id || "",
      taskId: activeTask?.id || "",
      taskParams: newTask,
    });

    setShowNotification(true);
    setNotificationText("Task edited successfully!");
  };

  return {
    setNotificationText,
    setShowNotification,
    showNotification,
    isLoadingEdit,
    isErrorEdit,
    errorEdit,
    notificationText,
    handleSubmit,
  };
};

export default useEditTask;

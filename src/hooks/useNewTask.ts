import { useMutation, useQueryClient } from "react-query";
import { FormEventHandler } from "react";
import useTaskFormStore from "../store/taskFormStore";
import useTaskboards from "./useTaskboards";
import useTaskboardStore from "../store/taskboardStore";
import { ITask } from "../types/Task.types";
import { createTask } from "../services/task_service";
import useNotification from "./useNotification";
import useConditionalViewsStore from "../store/conditionalViewsStore";

const useNewTask = () => {
  const queryClient = useQueryClient();
  const { nameInputValue } = useTaskFormStore((state) => state);
  const { descriptionInputValue } = useTaskFormStore((state) => state);
  const { iconInputValue } = useTaskFormStore((state) => state);
  const { statusInputValue } = useTaskFormStore((state) => state);
  const { setNameInputValue } = useTaskFormStore((state) => state);
  const { setDescriptionInputValue } = useTaskFormStore((state) => state);
  const { setIconInputValue } = useTaskFormStore((state) => state);
  const { setStatusInputValue } = useTaskFormStore((state) => state);
  const { setShowNewTask } = useConditionalViewsStore((state) => state);
  const { taskboardsFromQuery } = useTaskboards();
  const { activeTaskboardIndex } = useTaskboardStore((state) => state);
  const { setShowNotification } = useNotification();

  const currentTaskboard =
    taskboardsFromQuery && taskboardsFromQuery[activeTaskboardIndex];

  const { mutateAsync } = useMutation({
    mutationFn: ({
      taskboardId,
      newTask,
    }: {
      taskboardId: string;
      newTask: ITask;
    }) => createTask(taskboardId, newTask),
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

    await mutateAsync({ taskboardId: currentTaskboard.id, newTask });

    setNameInputValue("");
    setDescriptionInputValue("");
    setIconInputValue("Clock");
    setStatusInputValue("In progress");

    setShowNewTask(false);
  };

  return {
    handleSubmit,
  };
};

export default useNewTask;

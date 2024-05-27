import { FormEventHandler, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateTaskboard } from "../services/taskboard_service";
import useNotification from "./useNotification";
import useTaskboards from "./useTaskboards";
import useTaskboardStore from "../store/taskboardStore";
import useConditionalViewsStore from "../store/conditionalViewsStore";

interface MutationParams {
  id: string;
  name: string;
  description: string;
}

const useEditTaskboardForm = () => {
  const queryClient = useQueryClient();
  const [inputName, setInputName] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const { taskboardsFromQuery } = useTaskboards();
  const { activeTaskboardIndex } = useTaskboardStore((state) => state);
  const { setShowEditTaskboard } = useConditionalViewsStore((state) => state);
  const {
    notificationText,
    setNotificationText,
    setShowNotification,
    showNotification,
  } = useNotification();

  const currentTaskboard =
    taskboardsFromQuery && taskboardsFromQuery[activeTaskboardIndex];

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (requestBody: MutationParams) => updateTaskboard(requestBody),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["taskboards"] }),
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    mutate({
      id: currentTaskboard.id,
      name: inputName,
      description: inputDescription,
    });
    setInputName("");
    setInputDescription("");

    setShowNotification(true);
    setNotificationText("Taskboard updated!");
  };

  return {
    showNotification,
    notificationText,
    isLoading,
    isError,
    error,
    handleSubmit,
    setShowNotification,
    setNotificationText,
    inputName,
    setInputName,
    inputDescription,
    setInputDescription,
    setShowEditTaskboard,
  };
};

export default useEditTaskboardForm;

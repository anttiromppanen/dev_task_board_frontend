import { CheckIcon, TrashIcon } from "@heroicons/react/16/solid";
import { AxiosError } from "axios";
import { FormEventHandler, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { printAxiosErrorText } from "../../helpers/notificationHelpers";
import useTaskboards from "../../hooks/useTaskboards";
import { updateTask } from "../../services/task_service";
import useTaskboardStore from "../../store/taskboardStore";
import { ITask, IconType, StatusType } from "../../types/Task.types";
import BlackOverlay from "../BlackOverlay";
import {
  ErrorNotification,
  RequestResponseNotification,
  SuccessNotification,
} from "../Notification";
import DescriptionTextarea from "./DescriptionTextarea";
import EditTaskFormHeader from "./EditTaskFormHeader";
import IconRadioButtons from "./IconRadioButtons";
import NameInput from "./NameInput";
import StatusRadioButtons from "./StatusRadioButtons";

function EditTask() {
  const queryClient = useQueryClient();

  const { taskboardsFromQuery } = useTaskboards();
  const { activeTask } = useTaskboardStore((state) => state);
  const { activeTaskboardIndex } = useTaskboardStore((state) => state);
  const currentTaskboard =
    taskboardsFromQuery && taskboardsFromQuery[activeTaskboardIndex];

  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [nameInputValue, setNameInputValue] = useState(activeTask?.name || "");
  const [activeIcon, setActiveIcon] = useState<IconType>(
    activeTask?.icon || "Clock",
  );
  const [descriptionInputValue, setDescriptionInputValue] = useState(
    activeTask?.description || "",
  );
  const [activeStatus, setActiveStatus] = useState<StatusType>(
    activeTask?.status || "In progress",
  );

  const { mutateAsync, isLoading, isError, error } = useMutation({
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
      icon: activeIcon || "",
      status: activeStatus || "",
    };

    await mutateAsync({
      taskboardId: currentTaskboard?.id || "",
      taskId: activeTask?.id || "",
      taskParams: newTask,
    });

    setShowNotification(true);
    setNotificationText("Task edited successfully!");
  };

  return (
    <>
      <BlackOverlay />
      <div
        className="
        fixed right-0 top-0 flex h-[calc(100dvh-16px)] w-[calc(100%-16px)] flex-col justify-between overflow-y-scroll rounded-xl bg-white px-7 py-5 shadow-lg
        md:right-4 md:top-1/2 md:h-[calc(100vh-16px)] md:w-2/3 md:-translate-y-1/2 lg:w-1/2"
      >
        <div>
          <EditTaskFormHeader />
          {/* 
          {isError && showNotification && error instanceof AxiosError && (
            <ErrorNotification
              text={`Error: ${printAxiosErrorText(error)}`}
              setNotificationText={setNotificationText}
              setShowNotification={setShowNotification}
            />
          )}
          {!isError && showNotification && (
            <SuccessNotification
              text={notificationText}
              setShowNotification={setShowNotification}
              setNotificationText={setNotificationText}
            />
          )}
          */}
          <RequestResponseNotification
            setNotificationText={setNotificationText}
            setShowNotification={setShowNotification}
            showNotification={showNotification}
            isError={isError}
            error={error}
            successNotification={notificationText}
          />
          <form
            id="editTaskForm"
            onSubmit={handleSubmit}
            className="
            mt-4 flex flex-col gap-y-3 *:tracking-wider [&>div>p]:text-sm [&>div>p]:font-normal [&>div>p]:text-userDarkGrey [&>label>input]:w-full [&>label>input]:text-base 
            [&>label>input]:text-black [&>label>textarea]:text-base [&>label>textarea]:text-black [&>label]:text-sm
            [&>label]:font-normal [&>label]:text-userDarkGrey
            "
          >
            <NameInput
              nameInputValue={nameInputValue}
              setNameInputValue={setNameInputValue}
            />
            <DescriptionTextarea
              descriptionInputValue={descriptionInputValue}
              setDescriptionInputValue={setDescriptionInputValue}
            />
            <IconRadioButtons
              setActiveIcon={setActiveIcon}
              activeIcon={activeIcon}
            />
            <StatusRadioButtons
              activeStatus={activeStatus}
              setActiveStatus={setActiveStatus}
            />
          </form>
        </div>
        {/* FORM ACTION BUTTONS */}
        <div className="mt-20 flex justify-end gap-x-4 text-sm text-white">
          <button
            type="button"
            className="flex items-center gap-x-1.5 rounded-full bg-userDarkGrey px-8 py-2"
          >
            Delete
            <TrashIcon className="size-5" />
          </button>
          <button
            type="submit"
            form="editTaskForm"
            className="flex items-center gap-x-1.5 rounded-full bg-userBlue px-8 py-2"
          >
            {isLoading ? "Saving..." : "Save"}
            <CheckIcon className="size-5" />
          </button>
        </div>
      </div>
    </>
  );
}

export default EditTask;

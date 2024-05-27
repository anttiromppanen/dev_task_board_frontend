import React, { Dispatch, FormEventHandler, SetStateAction } from "react";
import { CheckIcon, TrashIcon } from "@heroicons/react/16/solid";
import BlackOverlay from "../BlackOverlay";
import EditTaskFormHeader from "./EditTaskFormHeader";
import { RequestResponseNotification } from "../Notification";
import NameInput from "./NameInput";
import DescriptionTextarea from "./DescriptionTextarea";
import IconRadioButtons from "./IconRadioButtons";
import StatusRadioButtons from "./StatusRadioButtons";

interface Props {
  setNotificationText: Dispatch<SetStateAction<string>>;
  setShowNotification: Dispatch<SetStateAction<boolean>>;
  showNotification: boolean;
  isError: boolean;
  error: unknown;
  notificationText: string;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleDelete: FormEventHandler<HTMLButtonElement>;
  isLoading: boolean;
  isLoadingDelete: boolean;
}

function TaskForm({
  setNotificationText,
  setShowNotification,
  showNotification,
  isError,
  error,
  notificationText,
  handleSubmit,
  handleDelete,
  isLoading,
  isLoadingDelete,
}: Props) {
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
            <NameInput />
            <DescriptionTextarea />
            <IconRadioButtons />
            <StatusRadioButtons />
          </form>
        </div>
        {/* FORM ACTION BUTTONS */}
        <div className="mt-20 flex justify-end gap-x-4 text-sm text-white">
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-x-1.5 rounded-full bg-userDarkGrey px-8 py-2"
          >
            {isLoadingDelete ? "In progress..." : "Delete"}
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

export default TaskForm;

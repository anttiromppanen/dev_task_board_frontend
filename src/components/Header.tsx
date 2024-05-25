import { XMarkIcon } from "@heroicons/react/16/solid";
import { Dispatch, FormEventHandler, SetStateAction, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import penImg from "../assets/images/Edit_duotone.svg";
import logoImg from "../assets/images/Logo.svg";
import { updateTaskboard } from "../services/taskboard_service";
import { ErrorNotification, SuccessNotification } from "./Notification";
import useTaskboards from "../hooks/useTaskboards";
import useTaskboardStore from "../store/taskboardStore";

interface MutationParams {
  id: string;
  name: string;
  description: string;
}

function EditTaskboardForm({
  id,
  setIsEditing,
}: {
  id: string;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (requestBody: MutationParams) => updateTaskboard(requestBody),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["taskboards"] }),
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    mutate({ id, name: inputName, description: inputDescription });
    setInputName("");
    setInputDescription("");

    setShowNotification(true);
    setNotificationText("Taskboard updated!");

    console.log("submitted");
  };

  return (
    <div className="fixed left-0 top-0 h-dvh w-full bg-black/20">
      <div className="fixed left-1/2 top-1/2 h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4 shadow-lg md:max-h-96">
        <div className="flex w-full flex-wrap items-center justify-between">
          <p className="text-2xl">Edit taskboard</p>
          <button
            type="button"
            aria-label="Close form"
            onClick={() => setIsEditing(false)}
            className="p-2 text-userOrange"
          >
            <XMarkIcon className="size-8 text-userDarkGrey" />
          </button>
          {isError && showNotification && error instanceof Error && (
            <ErrorNotification
              text={error.message}
              setShowNotification={setShowNotification}
              setNotificationText={setNotificationText}
            />
          )}
          {!isError && showNotification && (
            <SuccessNotification
              text={notificationText}
              setShowNotification={setShowNotification}
              setNotificationText={setNotificationText}
            />
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="edit-taskboard-input mt-4 flex flex-col gap-y-4"
        >
          <label htmlFor="name">
            Taskboard name
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter new name"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="w-full"
            />
          </label>
          <label htmlFor="description">
            Description
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Enter new description"
              value={inputDescription}
              onChange={(e) => setInputDescription(e.target.value)}
              className="w-full"
            />
          </label>
          <button
            type="submit"
            disabled={isLoading}
            className="text-md mt-2 rounded-md bg-userBlue py-3 font-bold text-white focus:outline-2 focus:outline-orange-500"
          >
            {isLoading ? "SAVING..." : "SAVE"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Header() {
  const [isEditing, setIsEditing] = useState(false);
  const { activeTaskboardIndex } = useTaskboardStore();
  const { taskboardsIsError, taskboardsAreLoading, taskboardsFromQuery } =
    useTaskboards();

  const currentTaskboard =
    taskboardsFromQuery && taskboardsFromQuery[activeTaskboardIndex];

  return (
    <>
      {isEditing && (
        <EditTaskboardForm
          id={currentTaskboard && currentTaskboard.id}
          setIsEditing={setIsEditing}
        />
      )}
      <header className="mt-12">
        {taskboardsIsError && <h1>Error...</h1>}
        <div className="flex items-center">
          <img src={logoImg} alt="logo" className="mr-4" />
          <h1 className="text-[2.5rem]">
            {taskboardsAreLoading ? "Loading name..." : currentTaskboard?.name}
          </h1>
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="rounded-full p-4"
          >
            <img src={penImg} alt="Edit taskboard" />
          </button>
        </div>
        <h2 className="ml-[58px] font-light lg:font-normal">
          {taskboardsAreLoading
            ? "Loading description..."
            : currentTaskboard?.description}
        </h2>
      </header>
    </>
  );
}

export default Header;

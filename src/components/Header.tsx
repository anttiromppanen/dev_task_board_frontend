import { XMarkIcon } from "@heroicons/react/16/solid";
import { Dispatch, FormEventHandler, SetStateAction, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import penImg from "../assets/images/Edit_duotone.svg";
import logoImg from "../assets/images/Logo.svg";
import { updateTaskboard } from "../services/taskboard_service";

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
  const [successModal, setSuccessModal] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: (requestBody: MutationParams) => updateTaskboard(requestBody),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["taskboards"] }),
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    try {
      mutate({ id, name: inputName, description: inputDescription });
      setInputName("");
      setInputDescription("");

      setSuccessModal(true);
      setTimeout(() => setSuccessModal(false), 3000);
    } catch (error) {
      console.log(error);
    }

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
          {successModal && (
            <div className="flex-[0_0_100%] rounded-md bg-userLightGreen p-2 text-center font-semibold">
              Taskboard updated!
            </div>
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

function Header({
  id,
  name,
  description,
  isLoading,
  isError,
}: {
  id: string;
  name: string;
  description: string;
  isLoading: boolean;
  isError: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing && <EditTaskboardForm id={id} setIsEditing={setIsEditing} />}
      <header className="mt-12">
        {isError && <h1>Error...</h1>}
        <div className="flex items-center">
          <img src={logoImg} alt="logo" className="mr-4" />
          <h1 className="text-[2.5rem]">
            {isLoading ? "Loading name..." : name}
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
          {isLoading ? "Loading description..." : description}
        </h2>
      </header>
    </>
  );
}

export default Header;

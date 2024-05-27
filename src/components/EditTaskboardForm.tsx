import { XMarkIcon } from "@heroicons/react/16/solid";
import useEditTaskboardForm from "../hooks/useEditTaskboardForm";
import { RequestResponseNotification } from "./Notification";

function EditTaskboardForm() {
  const {
    error,
    handleSubmit,
    isError,
    isLoading,
    notificationText,
    showNotification,
    setNotificationText,
    setShowNotification,
    inputName,
    setInputName,
    inputDescription,
    setInputDescription,
    setShowEditTaskboard,
  } = useEditTaskboardForm();

  return (
    <div className="fixed left-0 top-0 h-dvh w-full bg-black/20">
      <div className="fixed left-1/2 top-1/2 h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4 shadow-lg md:max-h-96">
        <div className="flex w-full flex-wrap items-center justify-between">
          <p className="text-2xl">Edit taskboard</p>
          <button
            type="button"
            aria-label="Close form"
            onClick={() => setShowEditTaskboard(false)}
            className="p-2 text-userOrange"
          >
            <XMarkIcon className="size-8 text-userDarkGrey" />
          </button>
          <RequestResponseNotification
            error={error}
            isError={isError}
            setNotificationText={setNotificationText}
            setShowNotification={setShowNotification}
            showNotification={showNotification}
            successNotification={notificationText}
          />
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

export default EditTaskboardForm;

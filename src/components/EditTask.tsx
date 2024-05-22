import { XMarkIcon } from "@heroicons/react/16/solid";
import { Dispatch, SetStateAction } from "react";
import BlackOverlay from "./BlackOverlay";
import { ITaskWithId } from "./Tasks/Task";

function EditTask({
  activeTask,
  setShowEditTask,
}: {
  activeTask: ITaskWithId | null;
  setShowEditTask: Dispatch<SetStateAction<boolean>>;
}) {
  console.log(activeTask);

  return (
    <>
      <BlackOverlay />
      <div
        className="
        fixed right-0 top-0 h-[calc(100dvh-16px)] w-[calc(100%-16px)] rounded-xl bg-white px-7 py-5 shadow-lg
        md:right-4 md:top-1/2 md:h-[calc(100vh-16px)] md:w-1/2 md:-translate-y-1/2"
      >
        <div className="flex items-center justify-between">
          <p className="text-xl">Task details</p>
          <button
            type="button"
            onClick={() => setShowEditTask(false)}
            aria-label="Close"
          >
            <XMarkIcon className="size-6" />
          </button>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="[&>label>input]:w-full"
        >
          <label htmlFor="">
            Task name
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter task name"
              className="block"
            />
          </label>
          <label htmlFor="">
            Description
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter a short description"
              className="block"
            />
          </label>
          <div>
            <p>Icon</p>
            <div className="flex">
              <input type="radio" name="icon" id="" />
              <input type="radio" name="icon" id="" />
              <input type="radio" name="icon" id="" />
              <input type="radio" name="icon" id="" />
              <input type="radio" name="icon" id="" />
              <input type="radio" name="icon" id="" />
            </div>
          </div>
          <div>
            <p>Status</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 *:col-span-1">
              <label
                htmlFor="inProgress"
                className="flex-1 basis-full bg-red-500"
              >
                In progress
                <input
                  type="radio"
                  name="status"
                  id="inProgress"
                  className="peer sr-only"
                />
              </label>
              <label
                htmlFor="completed"
                className="flex-1 basis-full bg-green-500"
              >
                Completed
                <input
                  type="radio"
                  name="status"
                  id="completed"
                  className="peer sr-only"
                />
              </label>
              <label htmlFor="wontDo" className="bg-orange-500">
                Won&apos;t do
                <input
                  type="radio"
                  name="status"
                  id="wontDo"
                  className="peer sr-only"
                />
              </label>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 flex gap-x-4">
            <button type="button">Delete</button>
            <button type="button">Save</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditTask;

import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Dispatch, SetStateAction } from "react";
import { ITaskboard } from "./Taskboard";
import BlackOverlay from "./BlackOverlay";

function CreateTaskboard({
  setShowSavedTaskboards,
  taskboardsFromQuery,
  setActivetaskboardIndex,
}: {
  setShowSavedTaskboards: Dispatch<SetStateAction<boolean>>;
  taskboardsFromQuery: ITaskboard[];
  setActivetaskboardIndex: Dispatch<SetStateAction<number>>;
}) {
  return (
    <>
      <BlackOverlay />
      <div
        className="
            fixed left-1/2 top-1/2 h-[calc(100dvh-32px)] w-[calc(100%-32px)] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4 shadow-lg 
            md:bottom-10 md:left-auto md:right-10 md:top-auto md:h-[500px] md:w-96 md:-translate-x-0 md:-translate-y-0"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg">My Taskboards</h3>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setShowSavedTaskboards(false)}
            className="-mr-3 p-2"
          >
            <XMarkIcon className="size-8" />
          </button>
        </div>
        <div className="flex flex-col">
          {taskboardsFromQuery &&
            taskboardsFromQuery.map((taskboard: ITaskboard, i: number) => (
              <button
                key={taskboard.id}
                type="button"
                onClick={() => setActivetaskboardIndex(i)}
                className="border-b border-b-userLightGrey py-3 text-left transition-all hover:pl-2"
              >
                <article key={taskboard.id}>
                  <h3 className="text-lg font-medium">{taskboard.name}</h3>
                  <p>{taskboard.description}</p>
                </article>
              </button>
            ))}
        </div>
        <div className="absolute bottom-0 left-0 flex w-full items-center justify-between p-4 pb-2">
          <p className="text-black/50">2 new taskboards left</p>
          <button
            type="button"
            aria-label="Create new taskboard"
            className="group flex gap-x-1 rounded-md p-2 pr-3 transition-all hover:bg-userLightGrey/20"
          >
            <PlusIcon className="size-6 group-hover:text-userGreen" /> Create
            new
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateTaskboard;

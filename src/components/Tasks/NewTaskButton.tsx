import { PlusCircleIcon } from "@heroicons/react/16/solid";
import useConditionalViewsStore from "../../store/conditionalViewsStore";
import useTaskFormStore from "../../store/taskFormStore";

function NewTaskButton() {
  const { setNameInputValue } = useTaskFormStore((state) => state);
  const { setDescriptionInputValue } = useTaskFormStore((state) => state);
  const { setShowNewTask } = useConditionalViewsStore((state) => state);

  const handleClick = () => {
    setNameInputValue("");
    setDescriptionInputValue("");
    setShowNewTask(true);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-xl bg-userLightOrange p-4 text-left"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-5">
          <div className="w-fit rounded-xl bg-userOrange p-2">
            <div className="text-white">
              <PlusCircleIcon className="size-6" />
            </div>
          </div>
          <h3 className="text-xl font-semibold">Add new task</h3>
        </div>
      </div>
    </button>
  );
}

export default NewTaskButton;

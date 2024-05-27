import { XMarkIcon } from "@heroicons/react/16/solid";
import useConditionalViewsStore from "../../store/conditionalViewsStore";

function TaskFormHeader() {
  const { setShowEditTask } = useConditionalViewsStore((state) => state);
  const { setShowNewTask } = useConditionalViewsStore((state) => state);

  return (
    <div className="flex items-center justify-between">
      <p className="text-xl">Task details</p>
      <button
        type="button"
        onClick={() => {
          setShowEditTask(false);
          setShowNewTask(false);
        }}
        aria-label="Close"
      >
        <XMarkIcon className="size-6" />
      </button>
    </div>
  );
}

export default TaskFormHeader;

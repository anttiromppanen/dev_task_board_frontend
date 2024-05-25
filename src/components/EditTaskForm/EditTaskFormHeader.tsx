import { XMarkIcon } from "@heroicons/react/16/solid";
import useConditionalViewsStore from "../../store/conditionalViewsStore";

function EditTaskFormHeader() {
  const { setShowEditTask } = useConditionalViewsStore((state) => state);
  return (
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
  );
}

export default EditTaskFormHeader;

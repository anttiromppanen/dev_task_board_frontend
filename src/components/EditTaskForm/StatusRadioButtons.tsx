import { CheckIcon } from "@heroicons/react/16/solid";
import { rightIconSelector } from "../../helpers/taskHelpers";
import useTaskFormStore from "../../store/taskFormStore";
import { StatusWithoutTodo } from "../../types/Task.types";

const statusRadioButtons = Object.entries(rightIconSelector).slice(0, 3); // filter out todo from index 3

export default function StatusRadioButtons() {
  const { statusInputValue } = useTaskFormStore((state) => state);
  const { setStatusInputValue } = useTaskFormStore((state) => state);

  return (
    <div>
      <p>Status</p>
      <div className="mt-1 grid grid-cols-2 gap-x-6 gap-y-2 *:col-span-1">
        {statusRadioButtons.map(([value, icon]) => (
          <label
            key={value}
            htmlFor={value}
            className={`
                  relative flex items-center gap-x-2 rounded-xl border-2 border-userLightGrey p-0.5 focus-within:outline focus-within:outline-2 focus-within:!outline-userOrange 
                  ${statusInputValue === value && "outline outline-2 outline-userBlue"}
                  `}
          >
            <input
              type="radio"
              name="status"
              id={value}
              value={value}
              onChange={() => setStatusInputValue(value as StatusWithoutTodo)}
              checked={value === statusInputValue}
              className="sr-only"
            />
            <div
              className={`
                      flex size-10 items-center justify-center rounded-xl bg-userDarkGrey
                      ${value === "In progress" && "!bg-userOrange"}
                      ${value === "Completed" && "!bg-userGreen"}
                      ${value === "Won't do" && "!bg-userRed"}
                    `}
            >
              {icon}
            </div>
            <p>{value}</p>
            {value === statusInputValue && (
              <div className="absolute right-3 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded-full bg-userBlue p-0.5">
                <CheckIcon className="text-white" />
              </div>
            )}
          </label>
        ))}
      </div>
    </div>
  );
}

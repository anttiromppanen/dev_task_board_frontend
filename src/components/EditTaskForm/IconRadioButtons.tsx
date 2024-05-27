import { leftIconSelector } from "../../helpers/taskHelpers";
import useTaskFormStore from "../../store/taskFormStore";
import { IconType } from "../../types/Task.types";

const iconRadioButtons = Object.entries(leftIconSelector);

function IconRadioButtons() {
  const { iconInputValue } = useTaskFormStore((state) => state);
  const { setIconInputValue } = useTaskFormStore((state) => state);

  return (
    <div>
      <p>Icon</p>
      <div className="mt-1 flex gap-x-3">
        {iconRadioButtons.map(([value, icon]) => (
          <label key={value} htmlFor={value}>
            <input
              type="radio"
              name="icon"
              id={value}
              value={value}
              onChange={() => setIconInputValue(value as IconType)}
              checked={value === iconInputValue}
              className="peer sr-only"
            />
            <div className="rounded-xl bg-userLightGrey p-2.5 peer-checked:bg-userYellow peer-focus:outline peer-focus:outline-2 peer-focus:outline-userOrange">
              {icon}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default IconRadioButtons;

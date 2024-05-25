import { Dispatch, SetStateAction } from "react";
import { leftIconSelector } from "../../helpers/taskHelpers";
import { IconType } from "../../types/Task.types";

const iconRadioButtons = Object.entries(leftIconSelector);

function IconRadioButtons({
  setActiveIcon,
  activeIcon,
}: {
  setActiveIcon: Dispatch<SetStateAction<IconType>>;
  activeIcon: IconType;
}) {
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
              onChange={() => setActiveIcon(value as IconType)}
              checked={value === activeIcon}
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

import { leftIconSelector, rightIconSelector } from "../../helpers/taskHelpers";
import { ITask, ITaskVariantStyles, StatusType } from "../../types/Task.types";

const taskVariantStyles: Record<StatusType, ITaskVariantStyles> = {
  "In progress": {
    container: "bg-userYellow",
    leftImage: "text-userOrange",
    rightImage: "bg-userOrange",
  },
  Completed: {
    container: "bg-userLightGreen",
    leftImage: "text-userGreen",
    rightImage: "bg-userGreen",
  },
  "Won't do": {
    container: "bg-userPink",
    leftImage: "text-userRed",
    rightImage: "bg-userRed",
  },
  Todo: {
    container: "bg-userLightGrey",
    leftImage: "text-inherit",
    rightImage: "bg-inherit",
  },
};

function Task({
  name,
  description,
  icon,
  status,
  handleClick,
}: ITask & { handleClick: () => void }) {
  // task variant styles from const taskVariantStyles via status prop
  const variantStyles = taskVariantStyles[status];

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`rounded-xl p-4 text-left ${variantStyles.container}`}
    >
      {/* TOP PART ICONS AND TEXT */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-5">
          <div className="w-fit rounded-xl bg-white p-2">
            <div className={variantStyles.leftImage}>
              {leftIconSelector[icon] || leftIconSelector.Clock}
            </div>
          </div>
          <h3 className="text-xl font-semibold">{name}</h3>
        </div>
        <div className={`w-fit rounded-xl p-2 ${variantStyles.rightImage}`}>
          {rightIconSelector[status] || rightIconSelector["In progress"]}
        </div>
      </div>
      {/* BOTTOM PART DESCRIPTION */}
      <div className="pr-10">
        <p className="ml-[62px] text-base font-light">{description}</p>
      </div>
    </button>
  );
}

export default Task;

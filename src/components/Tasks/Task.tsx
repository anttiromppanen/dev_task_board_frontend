import {
  AcademicCapIcon,
  CalendarDaysIcon,
  CameraIcon,
  ClockIcon,
  CurrencyEuroIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/16/solid";
import { ReactNode } from "react";
import completedImg from "../../assets/images/Done_round.svg";
import inProgressImg from "../../assets/images/Time_atack_duotone.svg";
import wontDoImg from "../../assets/images/close_ring_duotone.svg";

// TaskType and IconType must match db values for status and icon
type StatusType = "In progress" | "Completed" | "Won't do" | "Todo";
type IconType =
  | "Clock"
  | "AcademicCap"
  | "Camera"
  | "CalendarDays"
  | "CurrencyEuro"
  | "PresentationChart";

// ITask must match Task db schema except id field
interface ITask {
  name: string;
  description: string;
  icon: IconType;
  status: StatusType;
}

export interface ITaskWithId extends ITask {
  id: string;
}

interface ITaskVariantStyles {
  container: string;
  leftImage: string;
  rightImage: string;
}

const iconSize = "size-6";

const leftIconSelector: Record<IconType, ReactNode> = {
  Clock: <ClockIcon className={iconSize} />,
  AcademicCap: <AcademicCapIcon className={iconSize} />,
  Camera: <CameraIcon className={iconSize} />,
  CalendarDays: <CalendarDaysIcon className={iconSize} />,
  CurrencyEuro: <CurrencyEuroIcon className={iconSize} />,
  PresentationChart: <PresentationChartLineIcon className={iconSize} />,
};

const rightIconSelector: Record<StatusType, ReactNode> = {
  Completed: <img src={completedImg} alt="Completed" />,
  "In progress": <img src={inProgressImg} alt="In progress" />,
  "Won't do": <img src={wontDoImg} alt="Won't do" />,
  Todo: null,
};

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

import { ReactNode } from "react";
import {
  AcademicCapIcon,
  CalendarDaysIcon,
  CameraIcon,
  ClockIcon,
  CurrencyEuroIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/16/solid";
import completedImg from "../assets/images/Done_round.svg";
import inProgressImg from "../assets/images/Time_atack_duotone.svg";
import wontDoImg from "../assets/images/close_ring_duotone.svg";
import { IconType, StatusType } from "../types/Task.types";

const iconSize = "size-6";

export const rightIconSelector: Record<StatusType, ReactNode> = {
  "In progress": <img src={inProgressImg} alt="In progress" />,
  Completed: <img src={completedImg} alt="Completed" />,
  "Won't do": <img src={wontDoImg} alt="Won't do" />,
  Todo: null,
};

export const leftIconSelector: Record<IconType, ReactNode> = {
  Clock: <ClockIcon className={iconSize} />,
  AcademicCap: <AcademicCapIcon className={iconSize} />,
  Camera: <CameraIcon className={iconSize} />,
  CalendarDays: <CalendarDaysIcon className={iconSize} />,
  CurrencyEuro: <CurrencyEuroIcon className={iconSize} />,
  PresentationChart: <PresentationChartLineIcon className={iconSize} />,
};

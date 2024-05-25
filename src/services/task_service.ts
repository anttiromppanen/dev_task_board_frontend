import axios from "axios";
import { ITask } from "../types/Task.types";

const baseUrl = "http://localhost:3001/api/taskboard";

export const updateTask = async (
  taskboardId: string,
  taskId: string,
  taskParams: ITask,
) => {
  const response = await axios.put(
    `${baseUrl}/${taskboardId}/task/${taskId}`,
    taskParams,
  );
  return response.data;
};

export const deleteTask = async () => {};

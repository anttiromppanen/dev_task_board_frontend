import axios from "axios";
import { ITask } from "../types/Task.types";

const baseUrl = "http://localhost:3001/api/taskboard";

export const createTask = async (taskboardId: string, newTask: ITask) => {
  const response = await axios.post(`${baseUrl}/${taskboardId}/task`, newTask);
  return response.data;
};

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

export const deleteTask = async (taskboardId: string, taskId: string) => {
  const response = await axios.delete(
    `${baseUrl}/${taskboardId}/task/${taskId}`,
  );

  return response.data;
};

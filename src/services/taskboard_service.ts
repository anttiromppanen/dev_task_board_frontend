import axios from "axios";

const baseUrl = "http://localhost:3001/api/taskboard";

export const getTaskboard = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export const getMultipleTaskboards = async (taskboards: string[]) => {
  const response = await axios.post(`${baseUrl}/get-multiple`, { taskboards });
  return response.data;
};

export const createTaskboard = async (name: string, description: string) => {
  const response = await axios.post(baseUrl, { name, description });
  return response.data;
};

export const updateTaskboard = async ({
  id,
  name,
  description,
}: {
  id: string;
  name: string;
  description: string;
}) => {
  const response = await axios.put(`${baseUrl}/${id}`, { name, description });
  return response.data;
};

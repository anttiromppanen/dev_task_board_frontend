import axios from "axios";

const baseUrl = "http://localhost:3000/taskboard";

export const getTaskboard = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};
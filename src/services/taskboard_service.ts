import axios from "axios";

const baseUrl = "http://localhost:3001/api/taskboard";

export const getTaskboard = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

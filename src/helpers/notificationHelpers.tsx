import { AxiosError } from "axios";

export type AxiosErrorDataObject = { error: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isAxiosErrorDataObject = (data: any): data is AxiosErrorDataObject =>
  data && typeof data === "object" && "error" in data;

export const printAxiosErrorText = (
  error: AxiosError<AxiosErrorDataObject> | AxiosError,
) => {
  if (error.response?.data && isAxiosErrorDataObject(error.response.data)) {
    return error.response.data.error;
  }
  return error.message;
};

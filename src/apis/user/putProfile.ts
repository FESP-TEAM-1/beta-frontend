import axios, { AxiosError } from "axios";

interface ErrorResponse {
  ok: boolean;
  message: string;
}

const putProfile = async (endpoint: string, body: object): Promise<{ isSuccess: boolean; message: string }> => {
  try {
    const response = await axios.put(endpoint, body);
    return { isSuccess: true, message: response.data.message || "성공" };
  } catch (err) {
    console.error(err);
    const axiosError = err as AxiosError;
    if (axiosError.response) {
      const errorData = axiosError.response.data as ErrorResponse;
      return { isSuccess: false, message: errorData.message };
    }
    return { isSuccess: false, message: "네트워크 오류" };
  }
};

export default putProfile;

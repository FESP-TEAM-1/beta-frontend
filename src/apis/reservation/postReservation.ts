import axios, { AxiosError } from "axios";

interface PostReservationParamType {
  orderId?: string;
  amount?: string;
  show_id: number;
  show_times_id: number;
  is_receive_email: 1 | 0;
}
interface ConfirmResponseType {
  ok: boolean;
  message: string;
}

const postReservation = async (body: PostReservationParamType) => {
  try {
    const { data } = await axios.post<ConfirmResponseType>(`/api/confirm`, body);

    if (!data.ok) {
      throw new Error(data.message);
    }
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status) {
      const data = error.response.data as { message: string };
      throw new Error(data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

export default postReservation;

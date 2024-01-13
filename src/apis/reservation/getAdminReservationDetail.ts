import axios from "axios";

interface ReservationDetail {
  show_reservation_info: ShowReservationInfo[];
  user_reservation: UserReservation[];
  show_times: ShowTime[];
}

interface ReservationDetailResponseType {
  ok: boolean;
  data: ReservationDetail;
}

const getAdminReservationDetail = async (id: number) => {
  const { data } = await axios<ReservationDetailResponseType>(`/api/show/admin/reservation/manage/${id}`);

  return data.data;
};

export default getAdminReservationDetail;

interface ShowReservationInfo {
  head_count: number;
}
export interface UserReservation {
  id: number;
  user_id: number;
  show_id: number;
  show_times_id: number;
  orderId: string;
  amount: number;
  is_receive_email: number;
  created_at: string;
  updated_at: string;
  login_id: string;
  user_name: string;
  phone_number: string;
  user_email: string;
}
interface ShowTime {
  id: number;
  show_id: number;
  date_time: string;
  head_count: number;
}

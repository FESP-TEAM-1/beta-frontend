import axios from "axios";

const deleteReservation = async (id: number, show_times_id: number, orderId: string) => {
  const res = await axios.delete(`/api/show/delete/user/reservation/${id}/${show_times_id}/${orderId}`);
  return res.data;
};

export default deleteReservation;

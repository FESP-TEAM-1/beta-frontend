import axios from "axios";

const deleteLike = async (show_id: string) => {
  await axios.delete(`/api/show/like-delete/${show_id}`);
};

export default deleteLike;

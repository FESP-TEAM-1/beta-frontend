import axios from "axios";

const postLike = async (show_id: string) => {
  await axios.post(`/api/show/like-add`, { show_id });
};

export default postLike;

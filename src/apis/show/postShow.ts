import axios from "axios";

interface PostShowResponse {
  ok: boolean;
  data: string;
}

const postShow = async (formData: FormData) => {
  try {
    const { data } = await axios.post<PostShowResponse>(`/api/show/upload`, formData);
    return data.ok;
  } catch (e) {
    console.error(e);
  }
};

export default postShow;

import axios from "axios";

interface PostStoryResponse {
  ok: boolean;
  data: string;
}
const postStory = async (formData: FormData) => {
  const { data } = await axios.post<PostStoryResponse>(`/api/story/upload`, formData);

  return data.ok;
};

export default postStory;

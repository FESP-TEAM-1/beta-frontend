import axios from "axios";

interface StoryDeleteResponse {
  ok: boolean;
  data?: string;
  message?: string;
}

const deleteStory = async (story_id: string, login_id: string) => {
  const { data } = await axios.delete<StoryDeleteResponse>(`/api/story/delete/${story_id}/${login_id}`);
  return data.ok;
};

export default deleteStory;

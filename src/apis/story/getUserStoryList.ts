import { StoryResponseType } from "@/types";
import axios from "axios";

const getUserStoryList = async () => {
  const { data } = await axios.get<StoryResponseType>(`/api/story/user`);
  return data.data;
};

export default getUserStoryList;

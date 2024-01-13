import axios from "axios";

interface PutShowResponse {
  ok: boolean;
  data: string;
}

const putShow = async (formData: FormData) => {
  const { data } = await axios.put<PutShowResponse>(`/api/show/update`, formData);
  return data.ok;
};

export default putShow;

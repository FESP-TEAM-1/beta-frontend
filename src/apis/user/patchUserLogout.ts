import axios from "axios";

interface PropsTpye {
  ok: boolean;
  message: string;
}

const patchMemberLogout = async (): Promise<PropsTpye> => {
  const { data } = await axios.patch(`/api/logout`);
  return data;
};

export default patchMemberLogout;

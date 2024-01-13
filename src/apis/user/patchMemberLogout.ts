import axios from "axios";

interface PropsTpye {
  ok: boolean;
  message: string;
}

const patchUserLogout = async (): Promise<PropsTpye> => {
  const { data } = await axios.patch(`/api/logout`);
  return data;
};

export default patchUserLogout;

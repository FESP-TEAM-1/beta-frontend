import axios, { AxiosError } from "axios";

const getVerifyToken = async () => {
  try {
    const res = await axios.get(`/api/verifyToken`);
    const { login_id, user_name, user_role } = res.data.data;
    return { isLogin: true, login_id, user_name, user_role };
  } catch (error) {
    // accessToken이 만료된 경우
    const axiosError = error as AxiosError;

    if (axiosError.response && axiosError.response.status === 401) {
      try {
        const res = await axios.get(`/api/refreshToken`);
        const { login_id, user_name, user_role } = res.data.data;
        return { isLogin: true, login_id, user_name, user_role };
      } catch (refreshError) {
        // refreshToken도 만료된 경우
        return { isLogin: false, login_id: "", user_name: "", user_role: "" };
      }
    } else {
      // 다른 종류의 오류
      console.log("server error");
      return { isLogin: false, login_id: "", user_name: "", user_role: "" };
    }
  }
};

export default getVerifyToken;

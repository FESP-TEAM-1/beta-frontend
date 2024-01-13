import axios, { AxiosError } from "axios";

interface ErrorResponse {
  ok: boolean;
  message: string;
}

const patchMemberLogin = async (login_id: string, login_pw: string, user_role: "user" | "admin") => {
  let userLoginInfo = null;
  let message = "";
  let isSuccess = true;

  try {
    const { data } = await axios.patch(`/api/login`, {
      login_id,
      login_pw,
      user_role,
    });
    userLoginInfo = data.data;
    userLoginInfo["isLogin"] = true;
    return { isSuccess, userLoginInfo, message };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;

    isSuccess = false;
    if (axiosError.response?.status === 401) {
      message = axiosError.response.data.message;
    } else {
      message = "로그인 처리 중 오류가 발생했습니다";
    }
    return { isSuccess, userLoginInfo, message };
  }
};

export default patchMemberLogin;

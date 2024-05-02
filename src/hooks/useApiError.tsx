import axios from "axios";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useLoginStore } from "@/stores";

interface ErrorResponse {
  ok: boolean;
  message: string;
  errorCode?: string;
}

const useApiError = () => {
  const { setUserState } = useLoginStore();
  const handleError = useCallback((error: unknown) => {
    // 얘는 잘 안 먹힘
    if (!navigator.onLine) {
      toast.error("인터넷 연결이 끊겼습니다. 연결 상태를 확인해주세요.");
      toast.clearWaitingQueue();
      return;
    }

    if (axios.isAxiosError(error)) {
      if (error.response) {
        const httpStatus = error.response?.status;
        const errorResponse = error.response?.data as ErrorResponse;
        const httpMessage = errorResponse.message;
        const httpErrorCode = errorResponse.errorCode || null;

        // 에러 핸들러를 실행하기 전에 httpStatus가 유효한지 확인합니다.
        const handle = httpStatus ? statusHandlers[httpStatus] : statusHandlers.default;
        handle(httpMessage, httpErrorCode);
        toast.clearWaitingQueue();
        return;
      } else {
        toast.error("서버 연결이 원활하지 않습니다.");
        toast.clearWaitingQueue();
        return;
      }
    } else {
      toast.error("네트워크 연결 오류 또는 기타 오류가 발생했습니다.");
      toast.clearWaitingQueue();
      return;
    }
  }, []);

  const statusHandlers: { [key: number]: (msg: string, errorCode: string | null) => void; default: (msg: string) => void } = {
    400: (msg: string) => toast.error(msg),
    401: (msg: string, errorCode) => {
      if (errorCode === "NOT_LOGGED_IN") {
        setUserState({ isLogin: false, login_id: "", user_name: "", user_role: "" });
        toast.error("로그인 세션이 만료가 되었습니다. 다시 로그인 해주세요.");
      } else {
        toast.error(`${msg}`);
      }
    },
    500: () => toast.error("서버 오류가 발생했습니다."),
    default: () => toast.error("서버에서 알 수 없는 오류가 발생했습니다."),
  };

  return { handleError };
};

export default useApiError;

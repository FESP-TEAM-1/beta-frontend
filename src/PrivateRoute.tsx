import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const { isLoading, isError, user } = useAuth();
  const location = useLocation();

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>error</div>;

  const isMyPage = location.pathname.startsWith("/mypage");
  const isAdmin = location.pathname.startsWith("/mypage/admin");
  const isUser = location.pathname.startsWith("/mypage/user");

  if (isMyPage && !user.isLogin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isAdmin && user.user_role !== "admin") {
    toast.error("관리자만 접근 가능합니다.");
    return <Navigate to="/" replace />;
  }

  if (isUser && user.user_role !== "user") {
    toast.error("일반 유저만 접근 가능합니다.");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;

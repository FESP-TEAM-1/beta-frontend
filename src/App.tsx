import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./components/layouts";
import { useModalStore } from "./stores";
import PrivateRoute from "./PrivateRoute";

function App() {
  const location = useLocation();
  const { setOpenModal } = useModalStore();
  const isPrivateRoute = location.pathname.startsWith("/mypage");

  useEffect(() => {
    if (location.state?.from !== "detail") window.scrollTo(0, 0);
    setOpenModal({ state: false, type: "" });
  }, [location.pathname, setOpenModal]);

  return (
    <>
      {location.pathname !== "/signup" && location.pathname !== "/login" && <Header />}
      {isPrivateRoute ? <PrivateRoute /> : <Outlet />}
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "./components/layouts";
import { useModalStore } from "./stores";
import PrivateRoute from "./routes/PrivateRoute";
import { useApiError, useNetworkOffline } from "./hooks";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NetworkErrorPage from "./pages/Error/NetworkErrorPage";

function App() {
  const location = useLocation();
  const { setOpenModal } = useModalStore();
  const isPrivateRoute = location.pathname.startsWith("/mypage");
  const isNotLoginOrSignUpPage = location.pathname !== "/signup" && location.pathname !== "/login";
  const isNetworkOffline = useNetworkOffline();

  useEffect(() => {
    if (location.state?.from !== "detail") window.scrollTo(0, 0);
    setOpenModal({ state: false, type: "" });
  }, [location.pathname, setOpenModal]);

  const { handleError } = useApiError();
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        mutations: {
          onError: handleError,
          networkMode: "always",
        },
        queries: {
          networkMode: "always",
        },
      },
      queryCache: new QueryCache({
        onError: handleError,
      }),
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {isNetworkOffline && <NetworkErrorPage />}
      {isNotLoginOrSignUpPage && <Header />}
      {isPrivateRoute ? <PrivateRoute /> : <Outlet />}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

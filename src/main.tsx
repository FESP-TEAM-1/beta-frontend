import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";

import router from "./Router";
import "./global.css";

export const queryClient = new QueryClient();

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_APP_API_ENDPOINT;

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      closeOnClick={true}
      pauseOnHover={true}
      draggable={true}
      theme="light"
    />
  </QueryClientProvider>,
  // </React.StrictMode>,
);

import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import {
  LoginPage,
  SignupPage,
  MainPage,
  MainConcertPage,
  MainExhibitionPage,
  DetailPage,
  ErrorPage,
  PaySuccessPage,
  PayFailPage,
  Mypage,
  ProfilePage,
  LikeManagePage,
  ReviewManagePage,
  StoryManagePage,
  UserReservationManagePage,
  PostManagePage,
  PostCRUDPage,
  AdminReservationManagePage,
} from "@/pages";
import { InfoSection, ReviewSection } from "@/components/detail";
import { NavBar } from "./components/layouts";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    errorElement: <ErrorPage />,
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/concert",
        element: <MainConcertPage />,
      },
      {
        path: "/exhibition",
        element: <MainExhibitionPage />,
      },
      {
        path: "/detail/:id",
        element: (
          <>
            <NavBar />
            <DetailPage />
          </>
        ),
        children: [
          {
            index: true,
            element: <InfoSection />,
          },
          {
            path: "review",
            element: <ReviewSection />,
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/mypage",
        element: <Mypage />,
        children: [
          {
            index: true,
            path: "profile",
            element: <ProfilePage />,
          },

          {
            path: "admin",
            children: [
              {
                path: "reservation",
                element: <AdminReservationManagePage />,
              },
              {
                path: "post",
                element: <PostManagePage />,
              },
              {
                path: "post/upload",
                element: <PostCRUDPage />,
              },
              {
                path: "post/update",
                element: <PostCRUDPage />,
              },
            ],
          },
          {
            path: "user",
            children: [
              {
                path: "like",
                element: <LikeManagePage />,
              },
              {
                path: "review",
                element: <ReviewManagePage />,
              },
              {
                path: "story",
                element: <StoryManagePage />,
              },
              {
                path: "reservation",
                element: <UserReservationManagePage />,
              },
            ],
          },
        ],
      },
      {
        path: "/payment",
        children: [
          {
            path: "success",
            element: <PaySuccessPage />,
          },
          {
            path: "fail",
            element: <PayFailPage />,
          },
        ],
      },
    ],
  },
]);

export default router;

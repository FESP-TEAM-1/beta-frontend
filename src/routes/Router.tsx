import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/Error/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    errorElement: <ErrorPage />,
    element: <App />,
    children: [
      {
        path: "/",
        async lazy() {
          const { default: MainPage } = await import("../pages/Main/MainPage");
          return { Component: MainPage };
        },
      },
      {
        path: "/concert",
        async lazy() {
          const { default: MainConcertPage } = await import("../pages/MainConcert/MainConcertPage");
          return { Component: MainConcertPage };
        },
      },
      {
        path: "/exhibition",
        async lazy() {
          const { default: MainExhibitionPage } = await import("../pages/MainExhibition/MainExhibitionPage");
          return { Component: MainExhibitionPage };
        },
      },
      {
        path: "/detail/:id",
        async lazy() {
          const { default: DetailPage } = await import("../pages/Detail/DetailPage");
          return { Component: DetailPage };
        },
        children: [
          {
            index: true,
            async lazy() {
              const { default: InfoSection } = await import("../components/detail/InfoSection/InfoSection");
              return { Component: InfoSection };
            },
          },
          {
            path: "review",
            async lazy() {
              const { default: LoginPage } = await import("../components/detail/ReviewSection/ReviewSection");
              return { Component: LoginPage };
            },
          },
        ],
      },
      {
        path: "/login",
        async lazy() {
          const { default: LoginPage } = await import("../pages/Login/LoginPage");
          return { Component: LoginPage };
        },
      },
      {
        path: "/signup",
        async lazy() {
          const { default: SignupPage } = await import("../pages/Signup/SignupPage");
          return { Component: SignupPage };
        },
      },
      {
        path: "/mypage",
        async lazy() {
          const { default: Mypage } = await import("../pages/Mypage/Mypage");
          return { Component: Mypage };
        },
        children: [
          {
            index: true,
            path: "profile",
            async lazy() {
              const { default: ProfilePage } = await import("../pages/Mypage/ProfilePage/ProfilePage");
              return { Component: ProfilePage };
            },
          },
          {
            path: "admin",
            children: [
              {
                path: "reservation",
                async lazy() {
                  const { default: AdminReservationManagePage } = await import("../pages/Mypage/admin/ReservationManage/ReservationManagePage");
                  return { Component: AdminReservationManagePage };
                },
              },
              {
                path: "post",
                async lazy() {
                  const { default: PostManagePage } = await import("../pages/Mypage/admin/PostManage/PostManagePage");
                  return { Component: PostManagePage };
                },
              },
              {
                path: "post/upload",
                async lazy() {
                  const { default: PostUploadPage } = await import("../pages/Mypage/admin/PostUpload/PostUploadPage");
                  return { Component: PostUploadPage };
                },
              },
              {
                path: "post/update",
                async lazy() {
                  const { default: PostUpdatePage } = await import("../pages/Mypage/admin/PostUpdate/PostUpdatePage");
                  return { Component: PostUpdatePage };
                },
              },
            ],
          },
          {
            path: "user",
            children: [
              {
                path: "like",
                async lazy() {
                  const { default: LikeManagePage } = await import("../pages/Mypage/user/LikeManage/LikeManagePage");
                  return { Component: LikeManagePage };
                },
              },
              {
                path: "review",
                async lazy() {
                  const { default: ReviewManagePage } = await import("../pages/Mypage/user/ReviewManage/ReviewManagePage");
                  return { Component: ReviewManagePage };
                },
              },
              {
                path: "story",
                async lazy() {
                  const { default: StoryManagePage } = await import("../pages/Mypage/user/StoryManage/StoryManagePage");
                  return { Component: StoryManagePage };
                },
              },
              {
                path: "reservation",
                async lazy() {
                  const { default: UserReservationManagePage } = await import("../pages/Mypage/user/ReservationManage/ReservationManagePage");
                  return { Component: UserReservationManagePage };
                },
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
            async lazy() {
              const { default: PaySuccessPage } = await import("../pages/PaySuccess/PaySuccessPage");
              return { Component: PaySuccessPage };
            },
          },
          {
            path: "fail",
            async lazy() {
              const { default: PayFailPage } = await import("../pages/PayFail/PayFailPage");
              return { Component: PayFailPage };
            },
          },
        ],
      },
    ],
  },
]);

export default router;

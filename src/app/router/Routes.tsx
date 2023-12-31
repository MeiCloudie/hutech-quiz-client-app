import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom"
import App from "../layout/App"
import RequireAuth from "./RequireAuth"

import HomePage from "../../features/home/HomePage"
import NotFound from "../../features/errors/NotFound"
import ServerError from "../../features/errors/ServerError"
import TestErrors from "../../features/errors/TestErrors"
import ProfilePage from "../../features/profiles/ProfilePage"
import RoomPage from "../../features/rooms/list/RoomPage"
import RoomDetailsPage from "../../features/rooms/details/RoomDetailsPage"
import PlayQuizPage from "../../features/rooms/playQuiz/PlayQuizPage"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,

    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "home", element: <HomePage /> },
          { path: "profiles", element: <ProfilePage /> },
          // { path: "settings", element: <SettingPage /> },
          // { path: "helps", element: <HelpPage /> },
          // { path: "links", element: <LinkPage /> },
          // TODO: Chưa có trang quizCollection & histories
          { path: "rooms", element: <RoomPage /> },
          {
            path: "rm/:roomId",
            children: [
              {
                path: "",
                element: <RoomDetailsPage />,
              },
              {
                path: "play",
                element: <PlayQuizPage />,
              },
            ],
          },
          { path: "errors", element: <TestErrors /> },
        ],
      },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "*", element: <Navigate replace to="not-found" /> },
    ],
  },
]

export const router = createBrowserRouter(routes)

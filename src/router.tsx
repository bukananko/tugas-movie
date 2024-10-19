import LoginPage from "./pages/login.tsx";
import HomePage from "./pages/home.tsx";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/root.tsx";
import ProfilePage from "./pages/profile.tsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import type { Movies } from "../types";
import { useQuery } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";

const RootLayout = () => {
  const sessionId = localStorage.getItem("sessionId");
  const navigate = useNavigate();

  const { data: favMovies, isLoading: isFavMoviesLoading } = useQuery({
    queryKey: ["favMovies"],
    queryFn: async () => {
      const response = await useFetch<Movies>({
        url: `https://api.themoviedb.org/3/account/null/favorite/movies`,
        query: `&session_id=${sessionId}`,
      });

      return response.results ?? [];
    },
  });

  return (
    <main className="min-h-screen w-full">
      <header className="w-full flex justify-between items-center px-5 lg:px-20 py-3 sticky top-0 z-40 bg-white dark:bg-[#121212]">
        <Logo width={40} height={40} />

        <nav>
          <ul className="flex gap-4 font-semibold">
            <li className="hover:text-blue-500">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "text-blue-500" : "")}>
                Home
              </NavLink>
            </li>
            <li className="hover:text-blue-500">
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? "text-blue-500" : "")}>
                Profile
              </NavLink>
            </li>
            <li className="hover:text-blue-500">
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("sessionId");
                  navigate("/login");
                }}>
                {sessionId ? "Logout" : "Login"}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <Outlet context={{ favMovies, sessionId, isFavMoviesLoading }} />
    </main>
  );
};

export default RootLayout;

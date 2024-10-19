import { useNavigate, useOutletContext } from "react-router-dom";
import type { OutletContextProps } from "../types";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import { useEffect } from "react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { favMovies, isFavMoviesLoading, sessionId } = useOutletContext<OutletContextProps>();

  useEffect(() => {
    if (!sessionId) {
      navigate("/login");
    }
  }, [sessionId]);

  return (
    <div className="my-5 mx-5 lg:mx-20 space-y-5">
      <h1 className="text-3xl font-bold md:sticky top-3.5 z-50 bg-white dark:bg-[#121212] w-fit">
        Favorites
      </h1>

      {isFavMoviesLoading ? (
        <Loading />
      ) : favMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {favMovies?.map((item, i) => (
            <MovieCard movie={item} key={i} />
          ))}
        </div>
      ) : (
        <p>You haven't added any favorite movies.</p>
      )}
    </div>
  );
};

export default ProfilePage;

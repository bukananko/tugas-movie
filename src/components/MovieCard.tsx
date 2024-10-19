import dayjs from "dayjs";
import type { MovieDetail, OutletContextProps } from "../types";
import FavoriteButton from "./FavoriteButton";
import UnFavoriteButton from "./UnFavoriteButton";
import { useNavigate, useOutletContext } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const MovieCard = ({ movie }: { movie: MovieDetail }) => {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { sessionId, favMovies } = useOutletContext<OutletContextProps>();

  const { mutate: handleFavorite } = useMutation({
    mutationFn: async () => {
      if (!sessionId) return navigate("/login");

      if (favMovies?.map((item) => item.id).includes(movie.id)) {
        await useFetch({
          url: `https://api.themoviedb.org/3/account/null/favorite`,
          query: `&session_id=${sessionId}`,
          options: {
            method: "POST",
            body: JSON.stringify({
              media_id: movie.id,
              media_type: "movie",
              favorite: false,
            }),
          },
        });
      } else {
        await useFetch({
          url: `https://api.themoviedb.org/3/account/null/favorite`,
          query: `&session_id=${sessionId}`,
          options: {
            method: "POST",
            body: JSON.stringify({
              media_id: movie.id,
              media_type: "movie",
              favorite: true,
            }),
          },
        });
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["favMovies"] });
    },
  });

  return (
    <div className="w-fit space-y-2 cursor-pointer group relative hover:scale-105 transition-all ease-in duration-200">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="rounded-xl"
      />

      <div className="space-y-1 pb-2">
        <h2 className="font-bold hover:underline ">{movie.title}</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {dayjs(movie.release_date).format("MMMM D, YYYY")}
        </p>

        <button
          onClick={() => handleFavorite()}
          title="Add to Favorites"
          className="group-hover:scale-100 scale-0 transition-all ease-in-out duration-300 absolute top-2 right-2 bg-black rounded-full p-1">
          {favMovies?.map((item) => item.id)?.includes(movie.id) ? (
            <FavoriteButton
              className="text-yellow-500"
              width={30}
              height={30}
            />
          ) : (
            <UnFavoriteButton
              className="text-yellow-500"
              width={30}
              height={30}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;

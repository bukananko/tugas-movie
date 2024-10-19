import type { Movies } from "../types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import MovieCard from "../components/MovieCard";
import { useRef, useState } from "react";
import Loading from "../components/Loading";

const HomePage = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(6);

  const { data: nowPlaying, isLoading: isLoadingNowPlaying } = useQuery({
    queryKey: ["nowplaying"],
    queryFn: async () => {
      const nowPlaying = await useFetch<Movies>({
        url: `https://api.themoviedb.org/3/movie/now_playing`,
      });

      return nowPlaying.results.slice(0, 6) ?? [];
    },
  });

  const {
    data: popular,
    isLoading: isLoadingPopular,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["popular"],
    queryFn: async ({ pageParam }) => {
      const popular = await useFetch<Movies>({
        url: `https://api.themoviedb.org/3/movie/popular`,
        query: `&page=${pageParam + 1}`,
      });

      return popular.results;
    },
    getNextPageParam: (_, pages) => {
      if (pages.length === 2) return undefined;
      return pages.length;
    },
    initialPageParam: 0,
  });

  const popularMovies = popular?.pages.flatMap((res) => res) ?? [];

  return (
    <div ref={container} className="my-5 mx-5 lg:mx-20 space-y-5">
      <h1 className="text-3xl font-bold md:sticky top-3.5 z-50 bg-white dark:bg-[#121212] w-fit">
        Now Playing
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {isLoadingNowPlaying ? (
          <Loading />
        ) : (
          nowPlaying?.map((item) => <MovieCard movie={item} key={item.id} />)
        )}
      </div>

      <h1 className="text-3xl font-bold md:sticky top-4 z-50 bg-white dark:bg-[#121212] w-fit">
        Popular Movie
      </h1>
      {isLoadingPopular ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 relative w-full">
            {popularMovies?.slice(0, page).map((item, i) => (
              <MovieCard movie={item} key={i} />
            ))}
          </div>

          <div
            className={`${
              page !== 30 ? "" : "scale-0"
            } w-full flex justify-center items-center`}>
            <button
              onClick={() => {
                setTimeout(() => {
                  container.current?.lastElementChild?.scrollIntoView({
                    behavior: "smooth",
                  });
                }, 100);

                fetchNextPage();
                setPage(page + 6);
              }}
              className="bg-blue-600 hover:opacity-80 text-white font-bold py-2 px-4 rounded-md transition-all ease-in-out duration-300 disabled:opacity-30 disabled:cursor-not-allowed">
              Load More
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;

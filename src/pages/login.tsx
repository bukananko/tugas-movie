import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const LoginPage = () => {
  const navigate = useNavigate();
  const isApproved = window.location.search?.split("=")[2];
  const reqToken = window.location.search?.split("=")[1]?.split("&")[0];

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (isApproved === "true") {
        const { session_id } = await useFetch<{ session_id: string }>({
          url: `https://api.themoviedb.org/3/authentication/session/new`,
          options: {
            method: "POST",
            body: JSON.stringify({
              request_token: reqToken,
            }),
          },
        });

        localStorage.setItem("sessionId", session_id);
        navigate({ pathname: "/" });

        return;
      }

      const { request_token } = await useFetch<{ request_token: string }>({
        url: `https://api.themoviedb.org/3/authentication/token/new`,
      });

      window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${
        import.meta.env.VITE_REDIRECT_URL
      }`;
    },
  });

  return (
    <main className="min-h-screen w-full flex flex-col gap-10 justify-center items-center">
      <div>
        <h1 className="text-3xl font-bold">Log in</h1>
      </div>
      <div className="flex justify-center items-center flex-col gap-2">
        {isApproved !== "true" && (
          <h1 className="font-bold">Pls approved your account first</h1>
        )}
        <button
          onClick={() => mutate()}
          disabled={isPending}
          className="bg-blue-600 hover:opacity-80 text-white font-bold py-2 px-4 rounded-md transition-all ease-in-out duration-300 disabled:opacity-30 disabled:cursor-not-allowed">
          {isPending
            ? "Loading..."
            : isApproved === "true"
            ? "Continue using your TMDB account"
            : "Approve account"}
        </button>
      </div>
    </main>
  );
};

export default LoginPage;

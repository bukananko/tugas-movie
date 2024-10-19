type Props = {
  url: string;
  query?: string;
  options?: RequestInit;
};

const useFetch = async <T>({ url, query, options }: Props): Promise<T> => {
  const data: T = await fetch(
    url + `?api_key=${import.meta.env.VITE_API_KEY}${query ?? ""}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    }
  ).then((res) => res.json());

  return data;
};

export default useFetch;

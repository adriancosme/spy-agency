import useSWR, { SWRConfiguration } from "swr";

export default function useHits(url: string, config: SWRConfiguration = {}) {
  const { data, error} = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, config);
  return {
    hits: data || [],
    isLoading: !error && !data,
    isError: error
  }
}

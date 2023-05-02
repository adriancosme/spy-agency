import useSWR, { SWRConfiguration } from "swr";

export default function(config: SWRConfiguration) {
  const { data, error} = useSWR(`/hitmen`, config);
  return {
    hits: data || [],
    isLoading: !error && !data,
    isError: error
  }
}

import trackerService from "../services";
import { useQuery } from "@tanstack/react-query";

export const useTrackers = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['trackers'],
    queryFn: () => trackerService.getTrackers(),
    staleTime: 1000 * 60 * 5
  });

  return {
    trackers: data,
    loading: isLoading,
    error: isError
  }
}

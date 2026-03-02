import trackerService from "../services";
import { useQuery } from "@tanstack/react-query";

export const useTrackers = () => {
  return useQuery({
    queryKey: ['trackers'],
    queryFn: () => trackerService.getTrackers(),
    staleTime: 1000 * 60 * 5,
    retry: false
  });
}

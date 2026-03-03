import trackerService from "@/features/Home/services";
import { useQuery } from "@tanstack/react-query";

export const useTracker = (id: string) => {
  return useQuery({
    queryKey: ['tracker', id],
    queryFn: () => trackerService.getTrackerById(id),
    staleTime: 1000 * 60 * 5,
    retry: false
  });
}

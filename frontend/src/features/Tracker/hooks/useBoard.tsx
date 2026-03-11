import { useQuery } from "@tanstack/react-query";
import trackerService from "@/features/Home/services";

export const useBoard = (id: string) => {
  return useQuery({
    queryKey: ['board', id],
    queryFn: () => trackerService.getBoardByTrackerId(id),
    staleTime: 1000 * 60 * 5,
    retry: false
  });
}

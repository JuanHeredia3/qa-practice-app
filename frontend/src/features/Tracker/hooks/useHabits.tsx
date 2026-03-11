import trackerService from "@/features/Home/services";
import { useQuery } from "@tanstack/react-query";

export const useHabits = (id: string) => {
  return useQuery({
    queryKey: ['habits-list', id],
    queryFn: () => trackerService.getHabitsByTrackerId(id),
    staleTime: 1000 * 60 * 5,
    retry: false
  });
}

import { useQuery } from "@tanstack/react-query";
import { boardsService } from "../services";

export const useColumns = (id: string) => {
  return useQuery({
    queryKey: ['board-columns', id],
    queryFn: () => boardsService.getColumnsByBoardId(id),
    staleTime: 1000 * 60 * 5,
    retry: false
  });
}

import trackerService from "@/features/Home/services";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react"
import { useParams } from "react-router";

export const TrackerPage: FC= () => {
  const { id = '' } = useParams();

  const { data , isLoading, isError, error} = useQuery({
    queryKey: ['tracker', id],
    queryFn: () => trackerService.getTrackerById(id),
    staleTime: 1000 * 60 * 5,
    retry: false
  });

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al intentar cargar los trackers: {error.message}</p>;

  return (
    <>
      <div>TrackerPage</div>
      <div>{data?.data.name}</div>
    </>
  )
}

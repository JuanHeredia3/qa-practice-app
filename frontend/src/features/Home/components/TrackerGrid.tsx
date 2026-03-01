import { useTrackers } from "../hooks/useTrackers"
import { TrackerCard } from "./TrackerCard"

export const TrackerGrid = () => {
  const { trackers, error, loading } = useTrackers();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
      {
        trackers.map(tracker => (
          <TrackerCard title={tracker.name} description={tracker.description}/>
        ))
      }
    </div>
  )
}

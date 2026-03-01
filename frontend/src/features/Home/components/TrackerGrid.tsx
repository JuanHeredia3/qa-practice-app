import { useTrackers } from "../hooks/useTrackers";
import { TrackerCard } from "./TrackerCard"

export const TrackerGrid = () => {
  const { trackers, error, loading } = useTrackers();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al intentar cargar los trackers</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
      {
        trackers?.data.map((tracker, index) => (
          <TrackerCard 
            key={index}
            id={tracker.id}
            title={tracker.name} 
            description={tracker.description}
          />
        ))
      }
    </div>
  )
}

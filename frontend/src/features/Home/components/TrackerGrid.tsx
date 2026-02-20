import { TrackerCard } from "./TrackerCard"

export const TrackerGrid = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
      <TrackerCard />
    </div>
  )
}

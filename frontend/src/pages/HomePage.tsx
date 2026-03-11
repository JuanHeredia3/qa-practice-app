import { Button } from "@/components/ui/button"
import { TrackerGrid } from "@/features/Home/components/TrackerGrid"

export const HomePage = () => {
  return (
    <>
      <TrackerGrid />
      <Button className="fixed bg-purple-700 hover:bg-purple-900 bottom-6 right-6 rounded-full shadow-lg">
        + Crear Tracker
      </Button>
    </>
  )
}

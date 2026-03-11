import { TrackerCreation } from "@/features/Home/components/TrackerCreation"
import { TrackerGrid } from "@/features/Home/components/TrackerGrid"

export const HomePage = () => {
  return (
    <>
      <TrackerGrid />
      <TrackerCreation />
    </>
  )
}

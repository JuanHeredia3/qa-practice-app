import { TrackerHeader } from "@/features/Tracker/components/TrackerHeader";
import { useTracker } from "@/features/Tracker/hooks/useTracker";
import { KanbanBoard } from "@/shared/components/board/KanbanBoard";
import { HabitsTable } from "@/features/Tracker/components/HabitsTable";
import type { FC } from "react"
import { useParams } from "react-router";
import { useHabits } from "@/features/Tracker/hooks/useHabits";

export const TrackerPage: FC = () => {
  const { id = '' } = useParams();

  const { data: habits } = useHabits(id);
  const { data: tracker, isError: isTrackerError } = useTracker(id);

  if (!tracker) return <p>Cargando...</p>;
  if (isTrackerError) return <p>Tracker no encontrado</p>;

  return (
    <div className="flex flex-col space-y-7">
      <TrackerHeader name={tracker?.data.name ?? ''} description={tracker?.data.description ?? ''}/>
      <div className="h-px bg-slate-200/50" />
      <div>
        <KanbanBoard trackerId={id} habits={habits?.data ?? []}/>  
      </div>
      <div className="h-px bg-slate-200/50" />
      <div>
        <HabitsTable habits={habits?.data ?? []} />
      </div>
    </div>
  )
}

import { Button } from "@/components/ui/button";
import { TrackerHeader } from "@/features/Tracker/components/TrackerHeader";
import { useHabitsTracker } from "@/features/Tracker/hooks/useHabitsTracker";
import { useTracker } from "@/features/Tracker/hooks/useTracker";
import { KanbanBoard } from "@/shared/components/board/KanbanBoard";
import { HabitsTable } from "@/features/Tracker/components/HabitsTable";
import { TrackerCalendar } from "@/features/Tracker/components/TrackerCalendar";
import type { FC } from "react"
import { useParams } from "react-router";

const habitsArray = [
  { id: "1", title: "Login Test Cases", column: "pending" },
  { id: "2", title: "API Automation", column: "pending" },
  { id: "3", title: "Regression Suite", column: "pending" },
  { id: "4", title: "Smoke Testing", column: "pending" },
]

export const TrackerPage: FC = () => {
  const { id = '' } = useParams();

  const { date, habits, buttonDisable, handleDayChange, handleDragEnd } = useHabitsTracker(habitsArray);
  const { data, isLoading, isError } = useTracker(id);

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Tracker no encontrado</p>;

  return (
    <div className="flex flex-col space-y-7">
      <TrackerHeader name={data?.data.name ?? ''} description={data?.data.description ?? ''}/>
      <div className="h-px bg-slate-200/50" />
      <div>
        <div className="mb-5">
          <h2 className="text-lg text-slate-200">
            Tablero
          </h2>
          <small className="font-thin">{date}</small>
        </div>
        <KanbanBoard habits={habits} handleDragEnd={handleDragEnd}/>  
      </div>
      <div>
        <div className="flex justify-between mb-5">
          <TrackerCalendar handleDayChange={handleDayChange}/>
          <Button className="bg-purple-700 hover:bg-purple-900 text-white py-2 rounded-md" hidden={buttonDisable}>Actualizar</Button>
        </div>
      </div>
      <div className="h-px bg-slate-200/50" />
      <div>
        <div className="mb-5">
          <h2 className="text-lg text-slate-200">
            Listado de Hábitos
          </h2>
        </div>
        <HabitsTable />
      </div>
    </div>
  )
}

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core"
import { Column } from "./Column";
import { TaskCard } from "./TaskCard";
import { useHabitsTracker } from "@/features/Tracker/hooks/useHabitsTracker";
import type { Habit } from "@/features/Habits/types/habit.dto";
import { Button } from "@/components/ui/button";
import { TrackerCalendar } from "@/features/Tracker/components/TrackerCalendar";
import { useColumns } from "@/features/Tracker/hooks/useColumns";
import { useBoard } from "@/features/Tracker/hooks/useBoard";

export type Task = {
  id: string
  title: string
  column: string
}

interface Props {
  trackerId: string;
  habits: Habit[];
}

const filterHabits = (habitsToFilter: Habit[]) => {
  return habitsToFilter.map((habit) => ({
    id: habit.id,
    title: habit.name,
    column: habit.column_id
  }));
};

export function KanbanBoard({ trackerId, habits }: Props) {
  const { data: board } = useBoard(trackerId);
  const { data: columns } = useColumns(board?.data.id!);
  const {
    date,
    filteredHabits,
    buttonDisable,
    handleDayChange,
    handleDragEnd
  } = useHabitsTracker(filterHabits(habits));

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-lg text-slate-200">
          Tablero
        </h2>
        <small className="font-thin">{date}</small>
      </div>
      {
        columns?.data.length === 0 ? (
          <Button className="bg-purple-700 hover:bg-purple-900 text-white py-2 rounded-md">Crear Columnas</Button> 
        ) : (
        <div>
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {columns?.data.map((col) => (
                <Column key={col.id} id={col.id} title={col.name}>
                  {filteredHabits
                    .filter((habit) => habit.column === col.id)
                    .map((habit) => (
                      <TaskCard key={habit.id} task={habit} />
                    ))}
                </Column>
              ))}
            </div>
          </DndContext>
          <div className="flex justify-between my-5">
            <TrackerCalendar handleDayChange={handleDayChange}/>
            <Button className="bg-purple-700 hover:bg-purple-900 text-white py-2 rounded-md" hidden={buttonDisable}>Actualizar</Button>
          </div>
        </div>
        )
      }
    </div>
  )
}


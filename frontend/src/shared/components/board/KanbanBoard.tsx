import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core"
import type { DragEndEvent } from "@dnd-kit/core";
import { Column } from "./Column";
import { TaskCard } from "./TaskCard";

export type Task = {
  id: string
  title: string
  column: string
}

const columns = [
  { id: "pending", title: "Pendiente" },
  { id: "done", title: "Realizado" },
  { id: "not-done", title: "No Realizado" },
]

interface Props {
  habits: { id: string, title: string, column: string }[]

  handleDragEnd: (event: DragEndEvent) => void;
}

export function KanbanBoard({ habits, handleDragEnd }: Props) {

  return (
    <div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((col) => (
            <Column key={col.id} id={col.id} title={col.title}>
              {habits
                .filter((habit) => habit.column === col.id)
                .map((habit) => (
                  <TaskCard key={habit.id} task={habit} />
                ))}
            </Column>
          ))}
        </div>
      </DndContext>
    </div>
  )
}


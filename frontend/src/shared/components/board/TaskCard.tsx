import { useDraggable } from "@dnd-kit/core"
import type { Task } from "./KanbanBoard"

export function TaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id })

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`rounded-xl border border-slate-700 bg-slate-800 p-3 text-slate-100 text-sm cursor-grab transition-all
        ${isDragging ? "shadow-2xl ring-2 ring-orange-500" : "hover:border-orange-500"}`}
    >
      {task.title}
    </div>
  )
}
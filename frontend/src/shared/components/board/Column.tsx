import { useDroppable } from "@dnd-kit/core"

export function Column({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className="rounded-2xl border border-slate-700 bg-slate-900/60 backdrop-blur-sm p-4 min-h-[300px]"
    >
      <h3 className="text-slate-200 font-semibold mb-4">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  )
}
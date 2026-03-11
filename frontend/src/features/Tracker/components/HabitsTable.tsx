import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Habit } from "@/features/Habits/types/habit.dto";

function getStatusStyles(status: boolean) {
  return status ?
    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20";
}

function mapFrecuencyToDays(frequency: number[]) {
  const frequencyDays = frequency.map((dayNumber) => {
    switch (dayNumber) {
      case 1:
        return "Lunes"
      case 2:
        return "Martes"
      case 3:
        return "Miércoles"
      case 4:
        return "Jueves"
      case 5:
        return "Viernes"
      case 6:
        return "Sábado"
      case 7:
        return "Domingo"
    }
  });

  return frequencyDays.join(", ");
}

interface Props {
  habits: Habit[]
}

export function HabitsTable({ habits }: Props) {
  if (habits.length === 0) return <h3 className="text-lg text-slate-200 font-thin italic">Acá aparecerá el <b>listado de hábitos</b> de este tracker</h3>

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/70 backdrop-blur-sm shadow-lg p-4">
      <div className="mb-5">
        <h2 className="text-lg text-slate-200">
          Listado de Hábitos
        </h2>
      </div>

      <Table>
        <TableCaption className="text-slate-400">
          Listado de hábitos que contiene el tracker
        </TableCaption>

        <TableHeader>
          <TableRow className="border-b border-slate-700">
            <TableHead className="text-slate-300">Hábito</TableHead>
            <TableHead className="text-slate-300">Estado</TableHead>
            <TableHead className="text-slate-300">Tiempo dedicado</TableHead>
            <TableHead className="text-right text-slate-300">Frecuencia</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {habits.map((invoice) => (
            <TableRow
              key={invoice.id}
              className="border-b border-slate-800 hover:bg-slate-800/40 transition-colors"
            >
              <TableCell className="font-medium text-slate-100">
                {invoice.name}
              </TableCell>

              <TableCell>
                <span
                  className={`px-2 py-1 text-xs rounded-md font-medium ${getStatusStyles(
                    invoice.status
                  )}`}
                >
                  {invoice.status ? "Activo" : "Inactivo"}
                </span>
              </TableCell>

              <TableCell className="text-slate-300">
                {invoice.time_spent}
              </TableCell>

              <TableCell className="text-right text-slate-200 font-semibold">
                {mapFrecuencyToDays(invoice.frequency)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow className="border-t border-slate-700 bg-slate-800/50">
            <TableCell colSpan={3} className="text-slate-300 font-semibold">
              Total
            </TableCell>
            <TableCell className="text-right text-white font-bold">
              $2,500.00
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

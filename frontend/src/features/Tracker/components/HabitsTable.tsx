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

const habits = [
  { name: "INV001", status: "Activo", frecuency: "$250.00", timeSpent: "Credit Card" },
  { name: "INV002", status: "Inactivo", frecuency: "$150.00", timeSpent: "PayPal" },
  { name: "INV003", status: "Activo", frecuency: "$350.00", timeSpent: "Bank Transfer" },
  { name: "INV004", status: "Activo", frecuency: "$450.00", timeSpent: "Credit Card" },
  { name: "INV005", status: "Activo", frecuency: "$550.00", timeSpent: "PayPal" },
  { name: "INV006", status: "Inactivo", frecuency: "$200.00", timeSpent: "Bank Transfer" },
  { name: "INV007", status: "Activo", frecuency: "$300.00", timeSpent: "Credit Card" },
]

function getStatusStyles(status: string) {
  switch (status) {
    case "Activo":
      return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
    case "Inactivo":
      return "bg-red-500/10 text-red-400 border border-red-500/20"
    default:
      return "bg-red-500/10 text-red-400 border border-red-500/20"
  }
}

// interface Props {
//   habits: { id: string, title: string, column: string }[]
// }

export function HabitsTable() {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/70 backdrop-blur-sm shadow-lg p-4">
      <Table>
        <TableCaption className="text-slate-400">
          Listado de hábitos que contiene el tracker
        </TableCaption>

        <TableHeader>
          <TableRow className="border-b border-slate-700">
            <TableHead className="text-slate-300">Hábito</TableHead>
            <TableHead className="text-slate-300">Estado</TableHead>
            <TableHead className="text-slate-300">Frecuencia</TableHead>
            <TableHead className="text-right text-slate-300">Tiempo dedicado</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {habits.map((invoice) => (
            <TableRow
              key={invoice.name}
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
                  {invoice.status}
                </span>
              </TableCell>

              <TableCell className="text-slate-300">
                {invoice.timeSpent}
              </TableCell>

              <TableCell className="text-right text-slate-200 font-semibold">
                {invoice.frecuency}
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

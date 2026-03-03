import { Calendar } from "@/components/ui/calendar"

interface Props {
  handleDayChange: (date: Date) => void;
}

export function TrackerCalendar({ handleDayChange }: Props) {
  return <Calendar 
    mode="single" 
    className="rounded-2xl border border-slate-700 bg-slate-900/80 backdrop-blur-sm shadow-xl"
    classNames={{
      selected: "border rounded-md"
    }}
    onDayClick={handleDayChange}
  />
}

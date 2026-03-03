import type { DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";

export const useHabitsTracker = (habitslist: { id: string, title: string, column: string }[]) => {
  const [habits, setHabits] = useState(habitslist);
  const [date, setDate] = useState<string>(new Date().toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }));
  const [buttonDisable, setButtonDisable] = useState(true);
  
  const handleDayChange = (date: Date) => {
    setDate(date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }));
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const newHabits = habits.map((task) => {
      if (task.id === active.id) {
        if (task.column === over.id) return task

        setButtonDisable(false);

        return { ...task, column: over.id as string }
      } else {
        return task
      }
    });

    setHabits(newHabits);
  }

  return {
    habits,
    date,
    buttonDisable,

    handleDayChange,
    handleDragEnd,
  }
}

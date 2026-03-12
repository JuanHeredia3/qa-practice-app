import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCreateTracker } from "../context/useCreateTracker"

export function TrackerCreation() {
  const { openModal, setOpenModal, setTrackerTitle, setTrackerDescription, handleSubmit } = useCreateTracker();

  return (
    <AlertDialog open={openModal}>
      <AlertDialogTrigger asChild>
        <Button 
          className="fixed text-base bg-purple-700 hover:bg-purple-900 bottom-6 right-6 rounded-full shadow-lg"
          onClick={() => setOpenModal(true)}
        >
          + Crear Tracker
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-slate-900 border border-slate-700 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">
            Crear nuevo tracker
          </AlertDialogTitle>
        </AlertDialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mt-2">
              <Input
                placeholder="Nombre del tracker"
                className="bg-slate-800 border-slate-700 text-white"
                onChange={(e) => setTrackerTitle(e.target.value)}
                required
              />
              <Textarea
                placeholder="Descripción del tracker"
                className="bg-slate-800 border-slate-700 text-white"
                onChange={(e) => setTrackerDescription(e.target.value)}
                required
              />
            </div>
            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel 
                variant="ghost" 
                className="text-slate-300 hover:bg-slate-800 hover:text-slate-200"
                onClick={() => setOpenModal(false)}
              >
                Cancelar
              </AlertDialogCancel>
              <Button className="bg-purple-700 hover:bg-purple-900">Crear Tracker</Button>
            </AlertDialogFooter>
          </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
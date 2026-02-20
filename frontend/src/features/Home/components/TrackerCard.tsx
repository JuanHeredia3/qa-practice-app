import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"

export const TrackerCard = () => {
  return (
    <Card className="bg-slate-800 border border-slate-500 shadow-lg overflow-hidden relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardTitle className="text-slate-300 font-bold">Tracker Title</CardTitle>
        <CardDescription className="text-slate-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, nesciunt nostrum vel officia atque beatae?
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="bg-indigo-500 hover:bg-indigo-400 text-slate-100 w-full">View Tracker</Button>
      </CardFooter>
    </Card>
  )
}

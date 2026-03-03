import type { FC } from "react";

interface Props {
  name: string;
  description: string;
}

export const TrackerHeader: FC<Props> = ({ name, description }) => {
  return (
    <div>
      <h2 className="text-2xl mb-3 text-slate-100">
        {name}
      </h2>
      <small className="text-lg text-slate-400 italic">
        {description}
      </small>
    </div>
  )
}

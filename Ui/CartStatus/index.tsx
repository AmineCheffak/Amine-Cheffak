
import { memo } from "react";

const Status = ({value,label} :{value:string,label:string }) => {
  return (
    <div className="rounded-xl border border-line bg-dark p-3">
        <div className="font-cyber text-xl font-bold text-fluo">{value}</div>
        <div className="mt-0.5 text-sm leading-tight text-grid">{label}</div>
    </div>
  )
}

export default memo(Status);
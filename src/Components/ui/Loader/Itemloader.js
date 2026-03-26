'use client';
import { RingLoader } from "react-spinners";

export default function GlobalLoader({show}){
if(!show) return null;

return(
    <div className="fixed inset-0 flex justify-center h-screen xl:pt-40 items-center backdrop-blur-sm bg-black/30 z-50">
          <RingLoader color="#010002ff" />
    </div>
)
}
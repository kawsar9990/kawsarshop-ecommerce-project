'use client';
import { RingLoader } from "react-spinners";

export default function GlobalLoader({show}){
if(!show) return null;

return(
    <div className="fixed inset-0 flex justify-center h-screen items-center backdrop-blur-sm bg-black/30 z-[999999999999999999]">
          <RingLoader color="#010002ff" />
    </div>
)
}
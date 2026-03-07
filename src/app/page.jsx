"use client"

import FakeNotificationTitle from "../Components/ui/Notification/titlenotifaction";
import HomePage from "./home/page";

export default function Home() {
  return (
   <div className="pt-27 xl:pt-5">
   <FakeNotificationTitle />
    <div className="bg-[#FFF2F8]">
    <HomePage />
    </div>
   </div>
  );
}

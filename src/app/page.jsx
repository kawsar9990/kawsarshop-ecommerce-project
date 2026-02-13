"use client"

import AskNotificationPermission from "../Components/ui/Notification/Notification";
import FakeNotificationTitle from "../hooks/titlenotifac";
import HomePage from "./home/page";

export default function Home() {
  return (
   <div className="pt-27 xl:pt-5">
   <AskNotificationPermission />
   <FakeNotificationTitle />
    <div className="bg-[#FFF2F8]">
    <HomePage />
    </div>
   </div>
  );
}

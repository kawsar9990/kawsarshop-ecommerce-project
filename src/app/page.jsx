"use client"

import AskNotificationPermission from "../Components/ui/Notification/Notification";
import FakeNotificationTitle from "../hooks/titlenotifac";
import Loading from "../Components/ui/Loader/Pageloader";

import HomePage from "./home/page";

export default function Home() {
  return (
   <div className="pt-30 xl:pt-5">
   <AskNotificationPermission />
   <FakeNotificationTitle />
   <Loading />

    <div className="bg-[#F5F0F0]">
    <HomePage />
    </div>


   </div>
  );
}

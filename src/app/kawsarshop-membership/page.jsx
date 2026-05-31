'use client'

import { useState } from "react"
import { useAuth } from "@/src/context/AuthContext"
import MemberShipHero from "./MembershipHero"
import ExclusivePerk from "./ExclusivePerks"
import CashBack from "./Cashback"
import PaymentAndCancel from "./PaymentandCancellations"
import Refund from "./Refunds&returns"
import Shipping from "./Shipping"
import Footer from "./FooterSystem"
import MembershipModal from "./MembershipModal"


export default function page(){
const { user } = useAuth();
const [isModalOpen, setIsModalOpen] = useState(false);
const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);

return(
<div className="pt-30 md:pt-20 xl:pt-0" style={{userSelect: "none"}}>

<div>
<MemberShipHero onActivateClick={openModal} user={user}/>
</div>

<div>
<ExclusivePerk />
</div>

<div>
<CashBack />
</div>

<div>
<PaymentAndCancel />
</div>

<div>
<Refund onActivateClick={openModal} user={user}/>
</div>

<div>
<Shipping />
</div>

<div>
<Footer onActivateClick={openModal} user={user}/>
</div>


<MembershipModal isOpen={isModalOpen} onClose={closeModal} />
</div>
)
}
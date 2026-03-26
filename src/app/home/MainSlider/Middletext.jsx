import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTruck } from "@fortawesome/free-solid-svg-icons"


export default function MiddleText(){
    return(
        <div className="p-2 lg:p-20">

<div className="shadow-lg p-2 text-center rounded-lg border-2 border-red-600">
<div className="flex flex-col lg:flex-row lg:justify-center lg:items-center lg:gap-7">
    <div className="text-[25px] items-center uppercase flex flex-row justify-center font-semibold gap-5">
        <p className="text-[45px]"><FontAwesomeIcon icon={faTruck} /></p>
        <p>free shiping</p>
    </div>
    <p className="font-sans text-gray-700">Free Delivery Now On Your First Oder and over $300</p>

    <p className="text-2xl font-black">- Only $300*</p>
</div>
</div>

        </div>
    )
}
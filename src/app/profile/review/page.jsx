'use client'

export default function page(){

return(
<div style={{userSelect: "none"}}>
<div className="p-5">
<p className="font-bold text-gray-700">My Product Reviews</p>

<div className="bg-white shadow-2xl rounded-md p-6 mt-5 border border-gray-100">
<div  className="p-5">
<p className="text-center">You have submitted no reviews.</p>
</div>
</div>

</div>
</div>
)
}
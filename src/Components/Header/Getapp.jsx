'use client'

export default function Getapp(){
  return (
    <div className="absolute capitalize top-10 right-30" style={{zIndex: "1500000"}}>
      <div className="bg-white shadow-xl rounded-lg w-[220px] p-4 border">
        <p className="text-lg font-bold mb-2 text-center">📱 Download the App</p>
     

    <div>
        <img src={`https://res.cloudinary.com/dkmzakgx2/image/upload/v1770015189/qr-code_pzgiy7.png`} alt="" />
    </div>

    <p className="text-center text-gray-400">
Scan QR to download
or tap below
    </p>

<div className="flex justify-center mt-2 cursor-pointer">
    <img src={`https://res.cloudinary.com/dkmzakgx2/image/upload/v1770015189/button-1_wjkva4.png`} alt="" />
</div>

      </div>
    </div>
  )
}

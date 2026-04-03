'use client'

import { useState,useEffect } from 'react'
import Cropper from 'react-easy-crop'

export default function ImageCropper({ image, onCropComplete, onCancel, onConfirm }){

const [crop, setCrop] = useState({ x: 0, y: 0 })
const [zoom, setZoom] = useState(1)
const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

useEffect(() => {
  document.body.style.overflow = "hidden";
  return () => {
      document.body.style.overflow = "auto";
  };
}, []);


return(
<div className="fixed inset-0 z-[1000000] w-screen h-[100dvh] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-hidden touch-none">
<div className="relative w-full max-w-[360px] bg-[#1A1C23] rounded-3xl p-4 shadow-2xl border border-white/10 flex flex-col gap-5 my-auto max-h-[90dvh] overflow-y-auto scrollbar-hide">
<div className="relative w-full aspect-square bg-black rounded-xl overflow-hidden border border-gray-800 shadow-inner">
  <Cropper
    image={image}
    crop={crop}
    zoom={zoom}
    aspect={1 / 1}
    onCropChange={setCrop}
    onCropComplete={(croppedArea, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
    onZoomChange={setZoom}
    cropShape="round"
    showGrid={false}
    style={{
      containerStyle: { background: '#000', position: 'absolute' },
      cropAreaStyle: { border: '2px solid #BC105C' }
    }}
  />
</div>

<div className="space-y-5">
<div className="flex flex-col gap-2.5 px-1">
  <div className="flex justify-between items-center">
  <span className="text-white/60 text-[11px] font-semibold uppercase tracking-wider">Zoom</span>
  <span className="text-white/40 text-[11px] font-mono">{zoom.toFixed(1)}x</span>
  </div>
  <input
    type="range"
    min={1}
    max={3}
    step={0.1}
    value={zoom}
    onChange={(e) => setZoom(parseFloat(e.target.value))}
    className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer accent-[#BC105C] transition-all"
  />
</div>

<div className="flex gap-3">
 <button
   onClick={onCancel}
   className="flex-1 cursor-pointer bg-white/5 hover:bg-white/10 text-white/90 text-sm font-bold py-3 rounded-xl transition-all border border-white/5 active:scale-95 shadow-md"
 >
  Cancel
 </button>
 <button 
   onClick={() => onConfirm(croppedAreaPixels)}
   className="flex-1 bg-[#BC105C] cursor-pointer hover:bg-[#a00e4e] text-white text-sm font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95 active:shadow-inner"
 >
   Save Image
</button>
</div>
</div>
</div>
</div>
)
}




export const getCroppedImg = async (imageSrc, pixelCrop) => {
const image = new Image();
image.src = imageSrc;
    
await new Promise((resolve) => (image.onload = resolve));
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

canvas.width = pixelCrop.width;
canvas.height = pixelCrop.height;
ctx.drawImage(
 image,
 pixelCrop.x,
 pixelCrop.y,
 pixelCrop.width,
 pixelCrop.height,
 0,
 0,
 pixelCrop.width,
 pixelCrop.height
);
return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
     blob.name = "cropped-profile.jpeg";
     resolve(blob);
    }, 'image/jpeg');
});
};
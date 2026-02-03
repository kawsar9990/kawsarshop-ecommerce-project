'use client'

import Image from "next/image";

export default function ProductQuickView({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-md rounded-lg p-4 relative">

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-lg font-bold text-gray-500 hover:text-red-600"
        >
          ✕
        </button>

        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-[180px] object-cover rounded"
        />

        <div className="mt-3 space-y-1">
          <h2 className="text-sm font-semibold">{product.name}</h2>
          <p className="text-xs text-gray-400">{product.catetitle}</p>
          <p className="text-red-600 font-bold">{product.price}</p>
          <p className="text-xs">{product.ratestar}</p>
        </div>
      </div>
    </div>
  );
}

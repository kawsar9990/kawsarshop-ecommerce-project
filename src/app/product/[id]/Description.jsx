'use client'

export default function Description({description,review}){
    return(
        <div className="p-2 flex flex-col gap-3">
            {description && (
                <div>
                    <p className="font-semibold">{description}</p>
                </div>
            )}
            {review && (
                <div className="pb-2">
                    <p className="font-semibold">{review}</p>
                </div>
            )}
        </div>
    )
}
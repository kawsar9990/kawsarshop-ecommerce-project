"use client";

import { Suspense } from "react";
import OfferProductresult from "./result";

export default function page(){
    return(
        <Suspense fallback={<div>loading...</div>}>
            <OfferProductresult />
        </Suspense>
    )
}
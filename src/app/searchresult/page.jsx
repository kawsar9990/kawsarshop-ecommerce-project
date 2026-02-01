import { Suspense } from "react";
import Searchresult from "./searchresult";

export default function page(){
    return(
        <Suspense fallback={<div>loading...</div>}>
            <Searchresult />
        </Suspense>
    )
}
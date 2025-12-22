'use client'

import { useContext,useState,createContext } from "react"
import GlobalLoader from "../Components/ui/Loader/Itemloader";

const LoaderContext = createContext();

export function LoaderProvider({children}){
const [loading, setLoading] = useState(false);

const showLoader = () => setLoading(true);
const hideLoader = () => setLoading(false);

return(
<LoaderContext.Provider value={{showLoader,hideLoader}}>
    <GlobalLoader show={loading}/>
    {children}
</LoaderContext.Provider>
)
}

export const useLoader = () => useContext(LoaderContext)
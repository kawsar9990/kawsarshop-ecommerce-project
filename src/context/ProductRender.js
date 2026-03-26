'use client'

import { createContext, useContext , useState } from "react"

const MainProductContext = createContext();

export const MainProduct = ({children}) => {
const [category,setCategory] = useState("Fashion")

return(
<MainProductContext.Provider value={{category, setCategory}}>
{children}
</MainProductContext.Provider>
    )
}

export const useMainProduct = () => useContext(MainProductContext)
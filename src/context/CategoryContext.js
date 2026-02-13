"use client";

import { createContext, useContext, useState } from "react";

const Categorycontext = createContext();

export const CategoryProvider = ({children}) => {
 
    const [activeTab, setActiveTab] = useState("Fashion");
   
    return(
        <Categorycontext.Provider value={{activeTab, setActiveTab}}>
            {children}
        </Categorycontext.Provider>
    )
}

export const useCategory = () => useContext(Categorycontext)
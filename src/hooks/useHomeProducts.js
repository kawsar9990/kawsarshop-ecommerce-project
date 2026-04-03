'use client'

import { useState, useEffect } from "react";
import { getProducts } from "../services/api";

export const useHomeProducts = (category) => {
    const [products, setProducts] = useState([]);
    const [dataloading, setDataLoading] = useState(true);

    useEffect(()=> {
        const fetchHomeData = async () => {
            try{
                setDataLoading(true);
                const data = await getProducts(category, true, false)
                setProducts(data)
            }catch (error) {
                console.error("Error fetching home products:", error);
            }finally{
                setDataLoading(false)
            }
        };
        if(category) {
            fetchHomeData()
        }
    },[category])

return {products,dataloading}
}
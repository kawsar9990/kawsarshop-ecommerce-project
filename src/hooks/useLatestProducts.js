'use client'

import { useState, useEffect } from "react";
import { getProducts } from "../services/api";

export const useLatestProducts = () => {
    const [products, setProducts] = useState([]);
    const [dataloading, setDataLoading] = useState(true);

    useEffect(()=> {
        const LatestData = async () => {
            try{
                setDataLoading(true);
                const data = await getProducts(undefined, undefined, undefined, undefined, true)
                const LatestOnly = (data || []).filter(item => item.isLatest === true);
                setProducts(LatestOnly);
            }catch (error) {
                console.error("Error fetching home products:", error);
            }finally{
                setDataLoading(false)
            }
        };
        LatestData()
    },[])

return {products,dataloading}
}
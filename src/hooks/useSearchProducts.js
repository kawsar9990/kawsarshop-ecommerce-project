'use client'

import { useState, useEffect } from "react";
import { getProducts } from "../api/apiService";

export const useSearchProduct = (category) => {
    const [products, setProducts] = useState([]);
    const [dataloading, setDataLoading] = useState(true);

    useEffect(()=> {
        const fetchHomeData = async () => {
            try{
                setDataLoading(true);
                const data = await getProducts(category, false, false, false, false, true)
                setProducts(data)
            }catch (error) {
                console.error("Error fetching home products:", error);
            }finally{
                setDataLoading(false)
            }
        };
            fetchHomeData()
    },[category])

return {products,dataloading}
}
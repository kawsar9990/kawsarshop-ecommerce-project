'use client'

import { useState, useEffect } from "react";
import { getProducts } from "../api/apiService";

export const useFetauredProducts = () => {
    const [products, setProducts] = useState([]);
    const [dataloading, setDataLoading] = useState(true);

    useEffect(()=> {
        const fetchProductData = async () => {
            try{
                setDataLoading(true);
                const data = await getProducts(undefined, undefined, undefined, true,)
                const featuredOnly = (data || []).filter(item => item.isFeatured === true);
                setProducts(featuredOnly);
            }catch (error) {
                console.error("Error fetching home products:", error);
            }finally{
                setDataLoading(false)
            }
        };
        fetchProductData()
    },[])

return {products,dataloading}
}
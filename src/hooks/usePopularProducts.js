'use client'

import { useState, useEffect } from "react";
import { getProducts } from "../services/api";

export const usePopularProducts = (category) => {
  const [products, setProducts] = useState([]);
  const [dataloading, setDataLoading] = useState(true); 

  useEffect(()=> {
    const fetchPopularData = async () => {
        try{
        setDataLoading(true);
        const data = await getProducts(category, false, true)
        setProducts(data)
        }
        catch (error){
        console.error("Error fetching Popular products:", error);
        }
        finally{
        setDataLoading(false)
        }
    };
    if(category){
        fetchPopularData()
    }
  },[category])
  return {products,dataloading}
}
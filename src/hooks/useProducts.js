'use client'

import { useState, useEffect } from "react"
import { getProducts } from '../services/api';

export const useProducts = () => {
const [products, setProducts] = useState([]);
const [dataloading, setDataLoading] = useState(true);

useEffect(() => {
const loadData = async () => {
    try{
    const data = await getProducts();
    setProducts(data)
    }
    catch (error) {
    console.log(error);
    }
    finally{
    setDataLoading(false)
    }
};
loadData();
},[])
return {products,dataloading};
}
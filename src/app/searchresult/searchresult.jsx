'use client'

import { useState, useEffect } from "react"
import  ProductSkeleton from "../../Components/ui/Skeletons/ProductSkeleton"
import { useSearchParams } from "next/navigation"
import { useLoader } from "../../context/ItemLoaderContext"
import { useSearchProduct } from "../../hooks/useSearchProducts"

import FillterProduct from "./searchfilter"
import Header from "./searchheader"
import Products from "./searchproduct"



export default function Searchresult(){

const { products, dataloading } = useSearchProduct();
const searchparams = useSearchParams();
const searchQueary = searchparams.get("search")?.toLowerCase() || "";


const {showLoader,hideLoader} = useLoader()
const [selected, setSelected] = useState("Deafult")
const [categoryFilter, setCategoryFilter] = useState([]);
const [titlestyle, setTitleStyle] = useState(true)
const [list, setList] = useState(false)
const [rating, setRating] = useState([])
const [filterData, setFilterData] = useState([])
const [price, setPrice] = useState([2, 5000])


const handleLoading = () => {
    showLoader()
    setTimeout(() =>{
        hideLoader();
    }, 300);
};
 


useEffect(()=> {
setTitleStyle(true)
const view = sessionStorage.getItem("view");
if(view === "list"){
    setList(true);
    setTitleStyle(false);
}
if(view === "title"){
    setList(false);
    setTitleStyle(true);
  }
},[])


useEffect(()=> {

if (!products || products.length === 0) {
    setFilterData([]);
    return;
}


let temp = [...products];


if (categoryFilter.length > 0) {
  temp = temp.filter(item => 
    categoryFilter.includes(item.category) || 
    categoryFilter.includes(item.subCategory)
  );
}


if (searchQueary) {
     temp = temp.filter(item =>
     item.name?.toLowerCase().includes(searchQueary) ||
     item.category?.toLowerCase().includes(searchQueary) ||
     item.subCategory?.toLowerCase().includes(searchQueary) ||
     item.catetitle?.toLowerCase().includes(searchQueary) ||
     item.title?.toLowerCase().includes(searchQueary)
);
}



temp = temp.filter(i => {
    if(price[1] === 5000){
        return i.price >= price[0];
    }
  return i.price >= price[0] && i.price <= price[1];
})


if(rating.length > 0){
    temp = temp.filter(i => rating.includes(Math.floor(Number(i.ratestar))))
}


if(selected === "Name, A To Z") 
    temp.sort((a,b) => a.name.localeCompare(b.name));

if(selected === "Name, Z To A") 
    temp.sort((a,b) => b.name.localeCompare(a.name));

if(selected === "Price, Low To High") 
    temp.sort((a,b) => Number(a.price) - Number(b.price));

if(selected === "Price, High To Low") 
    temp.sort((a,b) => Number(b.price) - Number(a.price));


setFilterData(temp)
},[selected,price,rating,products,categoryFilter,searchQueary])



    return(
<div className="pt-25 xl:pt-0 w-full bg-[#FFF2F8]" style={{ userSelect: "none" }}>
<div className="flex w-full">
<FillterProduct price={price} setPrice={setPrice} rating={rating} setRating={setRating} 
categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}/>

<div className="w-full lg:w-3/4 flex flex-col p-2">
<Header filterData={filterData} selected={selected} setSelected={setSelected} titlestyle={titlestyle} setTitleStyle={setTitleStyle} list={list} setList={setList}/>

{dataloading ? (
<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-2">
  <ProductSkeleton count={8}/> 
</div>
) : (
<div>
{filterData.length > 0 ?(
<Products  handleLoading={handleLoading} data={products} filterData={filterData} titlestyle={titlestyle}/>
): (
  <div className="text-center text-2xl text-red-600 font-black flex justify-center items-center pt-20">
  <p>Product Not Found!</p>
  </div>
)} 
</div>
)}

</div>
</div>    
</div>
    )
}
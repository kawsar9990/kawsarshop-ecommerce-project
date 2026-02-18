'use client'



import { useState, useEffect } from "react"
import { useLoader } from "../../context/ItemLoaderContext"
import { useSearchParams } from "next/navigation"

import FillterProduct from "./searchfilter"
import Header from "./searchheader"
import Products from "./searchproduct"

import { Fashion } from "../../content/Allproduct/Fashion";
import { FashionMan } from "../../content/Allproduct/FashionMen";
import { FashionWomen } from "../../content/Allproduct/FashionWomen";
import { Electronics } from "../../content/Allproduct/Electronics";
import { Mobile } from "../../content/Allproduct/Mobile";
import { Leptop } from "../../content/Allproduct/leptop"
import { OthersElectronics } from "../../content/Allproduct/OtherElectronics";
import { Bags } from "../../content/Allproduct/Bags";
import { BagMen } from "../../content/Allproduct/BagsMen";
import { WomenBags } from "../../content/Allproduct/BagsWomen";
import { Footwear } from "../../content/Allproduct/Footwear";
import { FootwearMen } from "../../content/Allproduct/FootwearMen";
import { FootwearWomen } from "../../content/Allproduct/FootwearWomen"
import { Groceries } from "../../content/Allproduct/Groceries";
import { Beauty } from "../../content/Allproduct/Beauty";
import { Wellness } from "../../content/Allproduct/Wellness";
import { Jewellery } from "../../content/Allproduct/Jewellery"
import { Latest } from "../../content/Latestproduct/LatestProduct"

export default function Searchresult(){
    

const searchparams = useSearchParams();
const searchQueary = searchparams.get("search")?.toLowerCase() || "";

const Allproduct = [
    ...Fashion,
    ...FashionMan,
    ...FashionWomen,
    ...Bags,
    ...BagMen,
    ...Beauty,
    ...Electronics,
    ...Footwear,
    ...FootwearMen,
    ...FootwearWomen,
    ...Groceries,
    ...Jewellery,
    ...Leptop,
    ...Mobile,
    ...OthersElectronics,
    ...Wellness,
    ...WomenBags,
    ...Latest
]



const {showLoader,hideLoader} = useLoader()
const [selected, setSelected] = useState("Deafult")
const [categoryFilter, setCategoryFilter] = useState([]);
const [titlestyle, setTitleStyle] = useState(true)
const [list, setList] = useState(false)
const [rating, setRating] = useState([])
const [data, setData] = useState([])
const [filterData, setFilterData] = useState(Allproduct)
const [price, setPrice] = useState([2, 5000])


const handleLoading = (item,callback) => {
    showLoader()
    setTimeout(() =>{
        hideLoader();
        if(callback) callback()
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
let temp = [...Allproduct];


if(categoryFilter.length > 0){
    let allData = [];
    categoryFilter.forEach(cat => {
 switch(cat){
          case "Fashion": allData.push(...Fashion); break;
          case "Electronics": allData.push(...Electronics); break;
          case "Bags": allData.push(...Bags); break;
          case "Footwear": allData.push(...Footwear); break;
          case "Groceries": allData.push(...Groceries); break;
          case "Beauty": allData.push(...Beauty); break;
          case "Wellness": allData.push(...Wellness); break;
          case "Jewellery": allData.push(...Jewellery); break;
        }       
    })
   temp = allData
}
else{
    temp = [...Allproduct]
}



if(searchQueary){
    temp = temp.filter(
        item => 
            item.name?.toLowerCase().includes(searchQueary) ||
            item.category?.toLowerCase().includes(searchQueary) ||
            item.catetitle?.toLowerCase().includes(searchQueary)
        
    )
}


temp = temp.filter(i => {
    if(price[1] === 5000){
        return i.price >= price[0];
    }
  return i.price >= price[0] && i.price <= price[1];
})


if(rating.length > 0){
    temp = temp.filter(i => rating.includes(i.ratestar))
}


if(selected === "Name, A To Z") 
    temp.sort((a,b) => a.name.localeCompare(b.name));

if(selected === "Name, Z To A") 
    temp.sort((a,b) => b.name.localeCompare(a.name));

if(selected === "Price, Low To High") 
    temp.sort((a,b) => Number(a.price.replace(/[^0-9.-]+/g,"")) - Number(b.price.replace(/[^0-9.-]+/g,"")));

if(selected === "Price, High To Low") 
    temp.sort((a,b) => Number(b.price.replace(/[^0-9.-]+/g,"")) - Number(a.price.replace(/[^0-9.-]+/,"")));


setFilterData(temp)
},[selected,price,data,rating,categoryFilter,searchQueary])



    return(
<div className="pt-25 xl:pt-0 w-full bg-[#FFF2F8]" style={{ userSelect: "none" }}>
<div className="flex w-full">
<FillterProduct price={price} setPrice={setPrice} rating={rating} setRating={setRating} 
categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}/>

<div className="w-full lg:w-3/4 flex flex-col p-2">
<Header filterData={filterData} selected={selected} setSelected={setSelected} titlestyle={titlestyle} setTitleStyle={setTitleStyle} list={list} setList={setList}/>
<Products  handleLoading={handleLoading} data={data} filterData={filterData} titlestyle={titlestyle}/>


</div>
</div>    
</div>
    )
}
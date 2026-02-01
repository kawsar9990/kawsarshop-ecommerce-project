'use client'

import { useState, useEffect } from "react"
import { useMainProduct } from "../../context/ProductRender"
import { useLoader } from "../../context/ItemLoaderContext"

import Header from "./Header"
import FillterProduct from "./Fillterproduct"
import Products from "./Products"

import { Fashion } from "../../content/Allproduct/Fashion";
import { FashionMan } from "../../content/Allproduct/FashionMen";
import { FashionWomen } from "../../content/Allproduct/FashionWomen";
import { Electronics } from "../../content/Allproduct/Electronics";
import { Mobile } from "../../content/Allproduct/Mobile";
import { Leptop } from "../../content/Allproduct/leptop"
import { OthersElectronics } from "../../content/Allproduct/OtherElectronics";
import { Bag } from "../../content/Allproduct/Bags";
import { BagMen } from "../../content/Allproduct/BagsMen";
import { WomenBags } from "../../content/Allproduct/BagsWomen";
import { Footwear } from "../../content/Allproduct/Footwear";
import { FootwearMen } from "../../content/Allproduct/FootwearMen";
import { FootwearWomen } from "../../content/Allproduct/FootwearWomen"
import { Groceries } from "../../content/Allproduct/Groceries";
import { Beauty } from "../../content/Allproduct/Beauty";
import { Wellness } from "../../content/Allproduct/Wellness";
import { Jewellery } from "../../content/Allproduct/Jewellery"


export default function page(){
    
const {category} = useMainProduct();
const {showLoader,hideLoader} = useLoader()
const [selected, setSelected] = useState("Deafult")
const [categoryFilter, setCategoryFilter] = useState([]);
const [titlestyle, setTitleStyle] = useState(true)
const [list, setList] = useState(false)
const [rating, setRating] = useState([])
const [data, setData] = useState([])
const [filterData, setFilterData] = useState([])
const [price, setPrice] = useState([2, 5000])


// loading 
const handleLoading = (id) => {
    showLoader()
    setTimeout(() => hideLoader(), 300);
};



useEffect(()=>{
  if(!category) return;
  switch(category){
    case "Fashion": setData(Fashion); break;
    case "FashionWomen": setData(FashionWomen); break;
    case "FashionMan": setData(FashionMan); break;
    case "Electronics": setData(Electronics); break;
    case "Mobile": setData(Mobile); break;
    case "leptop": setData(Leptop); break;
    case "OthersElectronics": setData(OthersElectronics); break;
    case "Bag": setData(Bag); break;
    case "BagMen": setData(BagMen); break;
    case "WomenBags": setData(WomenBags); break;
    case "Footwear": setData(Footwear); break;
    case "FootwearMen": setData(FootwearMen); break;
    case "FootwearWomen": setData(FootwearWomen); break;
    case "Groceries": setData(Groceries); break;
    case "Beauty": setData(Beauty); break;
    case "Wellness": setData(Wellness); break;
    case "Jewellery": setData(Jewellery); break;
    default: setData([]);
  }
},[category]);



useEffect(()=> {
const catetitleckbox = ["Fashion","Electronics","Bag","Footwear","Groceries","Beauty","Wellness","Jewellery"];
if(catetitleckbox.includes(category)){
     setCategoryFilter([category])
}
},[category])




useEffect(()=> {
let temp = [...data];


if(categoryFilter.length > 0){
    let allData = [];
    categoryFilter.forEach(cat => {
 switch(cat){
          case "Fashion": allData = [...allData,...Fashion]; break;
          case "Electronics": allData = [...allData,...Electronics]; break;
          case "Bag": allData = [...allData,...Bag]; break;
          case "Footwear": allData = [...allData,...Footwear]; break;
          case "Groceries": allData = [...allData,...Groceries]; break;
          case "Beauty": allData = [...allData,...Beauty]; break;
          case "Wellness": allData = [...allData,...Wellness]; break;
          case "Jewellery": allData = [...allData,...Jewellery]; break;
        }       
    })
    temp = Array.from(new Set(allData))
}
else{
    temp = [...data]
}



temp = temp.filter(i => {
    const itemprice = Number(i.price.replace(/[^0-9.-]+/g, ""))  
    if(price[1] === 5000){
        return itemprice >= price[0];
    }
     return itemprice >= price[0] && itemprice <= price[1];
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
},[selected,price,data,rating,categoryFilter])


    return(
<div className="pt-25 xl:pt-0 w-full bg-white" style={{ userSelect: "none" }}>
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
'use client'

import ReactPaginate from "react-paginate"

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


const handleLoading = (item, callback) => {
    showLoader()
    setTimeout(() =>{
        hideLoader();
        if(callback) callback();
    }, 300);
};
 


const [currentpage, setcurrentpage] = useState(0)
useEffect(()=> {
    const savedPage = sessionStorage.getItem("current_pagination_page")
    if (savedPage) {
    setcurrentpage(Number(savedPage));
  }
},[])
const PER_PAGE = 32;
const Offset = currentpage * PER_PAGE;
const currentproducts = filterData.slice(Offset, Offset + PER_PAGE);
const pageCount = Math.ceil(filterData.length / PER_PAGE);
const handlePageClick = (event) => {
let selectedPage = event.selected;
setcurrentpage(selectedPage)

if(selectedPage === 0){
sessionStorage.removeItem("current_pagination_page")
}
else{
sessionStorage.setItem("current_pagination_page", selectedPage)
}

window.scrollTo({ top: 0, behavior: "smooth"})
};




useEffect(()=>{
  if(!category) return;

  const prevCategory = sessionStorage.getItem("prevCategory")
  if(prevCategory && prevCategory !== category){
    sessionStorage.removeItem("current_pagination_page")
    sessionStorage.removeItem("productsScrollY")
    setcurrentpage(0);
  }
  sessionStorage.setItem("prevCategory", category)

  switch(category){
    case "Fashion": setData(Fashion); break;
    case "FashionWomen": setData(FashionWomen); break;
    case "FashionMan": setData(FashionMan); break;
    case "Electronics": setData(Electronics); break;
    case "Mobile": setData(Mobile); break;
    case "leptop": setData(Leptop); break;
    case "OthersElectronics": setData(OthersElectronics); break;
    case "Bags": setData(Bags); break;
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
const catetitleckbox =
["Fashion","Electronics","Bags","Footwear","Groceries","Beauty","Wellness",
"Jewellery","leptop","FashionWomen","FashionMan","OthersElectronics","Mobile",
"BagMen","WomenBags","FootwearWomen","FootwearMen"];
if(catetitleckbox.includes(category)){
     setCategoryFilter([category])
}
},[category])



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
let temp = [...data];


if(categoryFilter.length > 0){
    let allData = [];
    categoryFilter.forEach(cat => {
 switch(cat){
        case "Fashion": allData = [...allData,...Fashion]; break;
        case "FashionWomen": allData = [...allData,...FashionWomen]; break;
        case "FashionMan": allData = [...allData,...FashionMan]; break;
        case "Electronics": allData = [...allData,...Electronics]; break;
        case "Mobile": allData = [...allData,...Mobile]; break;
        case "leptop": allData = [...allData,...Leptop]; break;
        case "OthersElectronics": allData = [...allData,...OthersElectronics]; break;
        case "Bags": allData = [...allData,...Bags]; break;
        case "BagMen": allData = [...allData,...BagMen]; break;
        case "WomenBags": allData = [...allData,...WomenBags]; break;
        case "Footwear": allData = [...allData,...Footwear]; break;
        case "FootwearMen": allData = [...allData,...FootwearMen]; break;
        case "FootwearWomen": allData = [...allData,...FootwearWomen]; break;
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
},[selected,price,data,rating,categoryFilter])




useEffect(() => {
  const fromViewAll = sessionStorage.getItem("fromViewAll");
  const savedScroll = sessionStorage.getItem("productsScrollY");

  if(fromViewAll){
    window.scrollTo(0,0);
    sessionStorage.removeItem("fromViewAll");
    return;
  }

  const prevCategory = sessionStorage.getItem("prevCategory");
  if(prevCategory && prevCategory !== category){
    window.scrollTo(0,0);
    sessionStorage.removeItem("productsScrollY");
  }
  sessionStorage.setItem("prevCategory", category)

  if(savedScroll && filterData.length > 0){
    setTimeout(()=>{
      window.scrollTo(0, Number(savedScroll));
    },50);
  }

}, [filterData,category]);




    return(
<div className="pt-25 xl:pt-0 w-full bg-[#FFF2F8]" style={{ userSelect: "none" }}>
<div className="flex w-full">
<FillterProduct price={price} setPrice={setPrice} rating={rating} setRating={setRating} 
categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}/>

<div className="w-full lg:w-3/4 flex flex-col p-2">
<Header filterData={filterData} selected={selected} setSelected={setSelected} titlestyle={titlestyle} setTitleStyle={setTitleStyle} list={list} setList={setList}/>
<Products  handleLoading={handleLoading} data={data} filterData={currentproducts} titlestyle={titlestyle}/>

{
pageCount > 1 && (
<ReactPaginate 
breakLabel="..."
previousLabel="< Prev"
nextLabel="Next >"
onPageChange={handlePageClick}
pageRangeDisplayed={3}
pageCount={pageCount}
renderOnZeroPageCount={null}
marginPagesDisplayed={1}
containerClassName="flex justify-center gap-2 mt-10 text-[10px] lg:text-[15px]"
pageClassName="border rounded border-gray-200"
pageLinkClassName="px-3 py-1 block text-[#E2136E] hover:text-black cursor-pointer hover:bg-gray-100"
activeClassName="bg-blue-400 border-blue-400"
activeLinkClassName="text-white pointer-events-none"
previousClassName="border rounded border-gray-200"
previousLinkClassName="px-3 py-1 block hover:bg-gray-100"
nextClassName="border rounded border-gray-200"
nextLinkClassName="px-3 py-1 block hover:bg-gray-100"
disabledClassName="opacity-40"
disabledLinkClassName="pointer-events-none"
forcePage={currentpage}
/>
    )
}

</div>
</div>    
</div>
    )
}
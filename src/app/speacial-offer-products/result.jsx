'use client'

import { useState, useEffect } from "react"
import  ProductSkeleton from "../../Components/ui/Skeletons/ProductSkeleton"
import { useSearchParams } from "next/navigation"
import ReactPaginate from "react-paginate"
import { useLoader } from "../../context/ItemLoaderContext"
import { useSearchProduct } from "../../hooks/useSearchProducts"

import FillterProduct from "./fillterproduct"
import FillterHeader from "./fillterheader"
import FillterBox from "./fillterbox"



export default function OfferProductresult(){

const { products, dataloading } = useSearchProduct();
const searchparams = useSearchParams();

const minParam = searchparams.get("min");
const maxParam = searchparams.get("max");
const offerAmount = searchparams.get("offer");

const {showLoader,hideLoader} = useLoader()
const [selected, setSelected] = useState("Deafult")
const [categoryFilter, setCategoryFilter] = useState([]);
const [titlestyle, setTitleStyle] = useState(true)
const [list, setList] = useState(false)
const [rating, setRating] = useState([])
const [filterData, setFilterData] = useState([])
const [price, setPrice] = useState([2, 500000]);

const [currentpage, setcurrentpage] = useState(0)
const PER_PAGE = 32;

const handleLoading = () => {
    showLoader()
    setTimeout(() =>{
        hideLoader();
    }, 300);
};
 

useEffect(()=> {
const savedPage = sessionStorage.getItem("offer_pagination_page");
if (savedPage) {
 setcurrentpage(Number(savedPage));
}
return () => {
  sessionStorage.removeItem("offer_pagination_page");  
}
},[])


useEffect(()=> {
if (minParam || maxParam) {
    setPrice([Number(minParam) || 2, Number(maxParam) || 500000]);
}
},[minParam, maxParam])


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


if (offerAmount) {
temp = temp.filter(i => Number(i.price) >= Number(offerAmount));
}


temp = temp.filter(i => Number(i.price) >= price[0] && Number(i.price) <= price[1]);


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
},[selected,price,rating,products,categoryFilter,offerAmount])



const Offset = currentpage * PER_PAGE;
const currentProducts = useMemo(() => {
return filterData.slice(Offset, Offset + PER_PAGE);
}, [filterData, Offset]);
const pageCount = Math.ceil(filterData.length / PER_PAGE);

const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setcurrentpage(selectedPage);
    sessionStorage.setItem("offer_pagination_page", selectedPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
};

    return(
<div className="pt-25 xl:pt-0 w-full bg-[#FFF2F8]" style={{ userSelect: "none" }}>
<div className="flex w-full">
<FillterBox price={price} setPrice={setPrice} rating={rating} setRating={setRating} 
categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}/>

<div className="w-full lg:w-3/4 flex flex-col p-2">
<FillterHeader filterData={filterData} selected={selected} setSelected={setSelected} titlestyle={titlestyle} setTitleStyle={setTitleStyle} list={list} setList={setList}/>

{dataloading ? (
<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-2">
  <ProductSkeleton count={18}/> 
</div>
) : (
<div>
{currentProducts.length > 0 ?(
<>
<FillterProduct  handleLoading={handleLoading} data={products} filterData={currentProducts} titlestyle={titlestyle}/>
{pageCount > 1 && (
    <ReactPaginate
        breakLabel="..."
        previousLabel="< Prev"
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        marginPagesDisplayed={1}
        containerClassName="flex justify-center gap-2 mt-10 mb-10 text-[10px] lg:text-[15px]"
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
)}
</>
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
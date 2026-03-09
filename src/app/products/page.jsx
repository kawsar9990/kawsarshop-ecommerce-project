'use client'

import ReactPaginate from "react-paginate"
import { useState, useEffect } from "react"
import ProductSkeleton from "../../Components/ui/Skeletons/ProductSkeleton"
import { useMainProduct } from "../../context/ProductRender"
import { useLoader } from "../../context/ItemLoaderContext"
import { useAllProducts } from "../../hooks/useAllProducts"

import Header from "./Header"
import FillterProduct from "./Fillterproduct"
import Products from "./Products"



export default function page(){
    
const {category,setCategory} = useMainProduct();
const {showLoader,hideLoader} = useLoader()
const { products, dataloading } = useAllProducts(category);
const [data, setData] = useState([])
const [selected, setSelected] = useState("Deafult")
const [categoryFilter, setCategoryFilter] = useState([]);
const [titlestyle, setTitleStyle] = useState(true)
const [list, setList] = useState(false)
const [rating, setRating] = useState([])
const [filterData, setFilterData] = useState([])
const [price, setPrice] = useState([2, 5000])


useEffect(() => {
    const savedCat = sessionStorage.getItem("active_category");
    if (savedCat) {
      setCategory(savedCat);
    }
  }, []);


useEffect(() => {
    const prevCategory = sessionStorage.getItem("active_category");

    if (prevCategory && prevCategory !== category) {
      sessionStorage.removeItem("productsScrollY");
      sessionStorage.setItem("current_pagination_page", 0);
      setcurrentpage(0);
      window.scrollTo(0, 0);
    }
    if (category) {
      sessionStorage.setItem("active_category", category);
      setCategoryFilter([category]);
    }
}, [category]);

useEffect(() => {
 if (products) {
      setData(products)
}
}, [products])





const handleLoading = () => {
    showLoader()
    setTimeout(() =>{
        hideLoader();
    }, 400);
};
 


const [currentpage, setcurrentpage] = useState(0)

useEffect(() => {
  const savedPage = sessionStorage.getItem("current_pagination_page");
  const prevCategory = sessionStorage.getItem("prevCategory");
  if (prevCategory === category && savedPage) {
    setcurrentpage(Number(savedPage));
  } else {
    setcurrentpage(0);
    sessionStorage.setItem("current_pagination_page", 0);
  }
  sessionStorage.setItem("prevCategory", category);
  
  if (category) setCategoryFilter([category]);
}, [category]); 

const PER_PAGE = 32;
const Offset = currentpage * PER_PAGE;
const currentproducts = filterData.slice(Offset, Offset + PER_PAGE);
const pageCount = Math.ceil(filterData.length / PER_PAGE);
const handlePageClick = (event) => {
setcurrentpage(event.selected)
sessionStorage.setItem("current_pagination_page", event.selected);
window.scrollTo({ top: 0, behavior: "smooth"})
};


useEffect(() => {
  if (category) setCategoryFilter([category]);
}, [category]);


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
let temp = [...products];

if (categoryFilter.length > 0) {
  temp = temp.filter(item => 
    categoryFilter.includes(item.category) || 
    categoryFilter.includes(item.subCategory)
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
},[selected,price,rating,products,categoryFilter])



useEffect(() => {
    const savedScroll = sessionStorage.getItem("productsScrollY");
    const fromViewAll = sessionStorage.getItem("fromViewAll");
    const activeCat = sessionStorage.getItem("active_category");

    if (fromViewAll) {
      window.scrollTo(0, 0);
      sessionStorage.removeItem("fromViewAll");
      return;
    }
    if (activeCat === category && savedScroll && filterData.length > 0) {
      const timeoutId = setTimeout(() => {
        window.scrollTo(0, Number(savedScroll));
      }, 150);
      return () => clearTimeout(timeoutId);
    }
  }, [filterData, category]);



    return(
<div className="pt-25 xl:pt-0 w-full bg-[#FFF2F8]" style={{ userSelect: "none" }}>
<div className="flex w-full">
<FillterProduct price={price} setPrice={setPrice} rating={rating} setRating={setRating} 
categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}/>

<div className="w-full lg:w-3/4 flex flex-col p-2">
<Header filterData={filterData} selected={selected} setSelected={setSelected} titlestyle={titlestyle} setTitleStyle={setTitleStyle} list={list} setList={setList}/>

{dataloading ? (
<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-2">
  <ProductSkeleton count={18}/> 
</div>
) : (
<div>
<Products  handleLoading={handleLoading} showLoader={showLoader} hideLoader={hideLoader} data={products} filterData={currentproducts} titlestyle={titlestyle}/>
</div>
)}
{!dataloading && pageCount > 1 && (
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
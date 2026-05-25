export default async function sitemap(){
 const baseUrl = "https://kawsarshop-ecommerce-web.netlify.app";
 
 const routes = ["", "/home", "/contact", "/product", "/about"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
 }));

 let productPages = [];

 try{
    const apiUrl = "https://kawsarshop-ecommerce-backend.onrender.com/api/all-products?isAllProduct=true";
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 }
    });

    const data = await response.json();
    const products = data.products || data;

    if(Array.isArray(products)){
        productPages = products.map((product) => ({
            url: `${baseUrl}/product/${product._id || product.id}`,
            lastModified: product.updatedAt ? new Date(product.updatedAt).toISOString() : new Date().toISOString(),
        }));
    }
 }
 catch(error){
   console.error("Sitemap product fetch error:", error);
    productPages = [];
 }

 return [...routes, ...productPages];
}
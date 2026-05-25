export default function robots(){
return{
 rules: {
  userAgent: "*",
  allow: "/", 
  disallow: ["/admin"],
 },
 sitemap: "https://kawsarshop-ecommerce-web.netlify.app/sitemap.xml",
}
}
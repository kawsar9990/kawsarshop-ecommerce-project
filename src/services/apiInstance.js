import axios from "axios";
import { signOut } from "next-auth/react";

const api = axios.create({
  baseURL: 'https://kawsarshop-ecommerce-backend.onrender.com/api',
  // baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});



api.interceptors.response.use(
(response) => response,
async (error) => {
const message = error.response?.data?.message || "";
const status = error.response?.status; 

if(status === 401 || message.toLowerCase().includes("jwt expired")){
 console.warn("Session expired! Automatically logging out...");
 
 if(typeof window !== "undefined"){
  try{
    await signOut({ redirect: false });
  }catch(error){
    console.error("Next-Auth signout failed during auto-logout", error);
  }

  localStorage.removeItem("kawsarshop_auth");
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/";
 }
}
return Promise.reject(error);
}
);



export default api;
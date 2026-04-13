import axios from 'axios';

const api = axios.create({
  baseURL: 'https://kawsarshop-ecommerce-backend.onrender.com/api',
  // baseURL: 'http://localhost:5000/api',
  withCredentials: true,
})


export const getWishlistAPI = async (userId) => {
try{
const response = await api.get(`/wishlist?userId=${userId}`);
return response.data;
}catch(error){
throw error.response.data || { message: "Error fetching wishlist" };
}
}



export const toggleWishlistAPI = async (userId, product) => {
try{
const response = await api.post('/wishlist/toggle', { userId, product });
return response.data;
}catch(error){
 throw error.response.data || { message: "Error toggling wishlist" };   
}
}



export default api;
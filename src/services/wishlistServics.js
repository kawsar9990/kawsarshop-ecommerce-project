import api from './apiInstance'



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



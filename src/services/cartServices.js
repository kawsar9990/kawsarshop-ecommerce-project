import api from './apiInstance'




export const getCartAPI = async (userId) => {
try{
const response = await api.get(`/cart?userId=${userId}`);
return response.data;
}catch(error){
throw error.response.data || { message: "Error fetching cart" };
}
}


export const syncCartAPI = async (userId, cartItems, appliedVoucher, voucherValue, voucherType) => {
  try {
    const response = await api.post(`cart/sync`, {
     userId, 
     cartItems,
     appliedVoucher, 
     voucherValue,
     voucherType
    });
    return response.data;
  } catch (error) {
    console.error("Cart API Error Detail:", error.response.data || error.message);
    throw error;
  }
};


export const addToCartAPI = async (userId, product) => {
try{
const response = await api.post('/cart/add', { userId, product });
return response.data;
}catch(error){
throw error.response.data || { message: "Error adding to cart" }; 
}
}


export const removeFromCartAPI = async (userId, productId) => {
try{
const response = await api.post('/cart/remove',{ userId, productId });
return response.data;
}catch(error){
throw error.response.data || { message: "Error removing item" };
}
}
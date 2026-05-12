import axios from 'axios';

const api = axios.create({
  baseURL: 'https://kawsarshop-ecommerce-backend.onrender.com/api',
  // baseURL: 'http://localhost:5000/api',
  withCredentials: true,
})


export const createOrderAPI = async (orderData, token) => {
try{
const response = await api.post('/orders/create', orderData, {
headers: {
    Authorization: `Bearer ${token}`
}    
});
return response.data
}catch(error){
const message = error.response.data.message || "Order placement failed!";
throw new Error(message);
}
}


export const getOrderByIdAPI = async (id, token) => {
try{
const response = await api.get(`/orders/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
return response.data
}
catch(error){
const message = error.response.data.message || "Failed to load order details!";
throw new Error(message);  
}
}



export const getOrdersByUserIdAPI = async (userId, token) => {
try{
const response = await api.get(`/orders/user/${userId}`, {
headers: {
Authorization: `Bearer ${token}`
}   
})
return response.data;
}
catch(error){
 const message = error.response.data.message || "Failed to load orders!";
 throw new Error(message);  
}
}



export const cancelOrderAPI = async (orderId, token) => {
try{
const response = await api.put(`/orders/${orderId}/cancel`, {}, {
  headers: {
    Authorization: `Bearer ${token}`
  }  
});
return response.data;
}
catch(error){
const message = error.response.data.message || "Failed to cancel order!";
throw new Error(message);
}
}



export const updateOrderStatusAPI = async (orderId, status, token) => {
try{
const response = await api.put(`/orders/${orderId}/status`, { status }, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
return response.data;
}
catch(error){
const message = error.response.data.message || "Failed to update order status!";
throw new Error(message);   
}
}


export default api;
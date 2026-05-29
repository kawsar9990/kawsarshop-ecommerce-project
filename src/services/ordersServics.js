import api from './apiInstance'


export const createOrderAPI = async (orderData, token) => {
try{
const response = await api.post('/orders/create', orderData, {
headers: {
    Authorization: `Bearer ${token}`
}    
});
return response.data
}catch(error){
const message = error.response?.data?.message || "Order placement failed!";
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
const message = error.response?.data?.message || "Failed to load order details!";
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
 const message = error.response?.data?.message || "Failed to load orders!";
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
const message = error.response?.data?.message || "Failed to cancel order!";
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
const message = error.response?.data?.message || "Failed to update order status!";
throw new Error(message);   
}
}



export const trackOrderPublicAPI = async (orderId, phone) => {
try{
const cleanId = orderId.toString().trim();
const cleanPhone = phone.toString().trim();
const response = await api.get(`/orders/track/${cleanId}?phone=${cleanPhone}`);
return response.data;  
}
catch(error){
const message = error.response?.data?.message || "Order not found!";
throw new Error(message);
}
}



import axios from 'axios';

const api = axios.create({
  baseURL: 'https://kawsarshop-ecommerce-backend.onrender.com/api',
  // baseURL: 'http://localhost:5000/api',
  withCredentials: true,
})


export const verifyVoucherAPI = async (code, subtotal) => {
try{
const response = await api.post('/vouchers/verify-voucher', {
 code,
 subtotal   
});
return response.data;
}catch(error){
  throw error.response.data || { message: "Server error occurred" };  
}
}

export default api;
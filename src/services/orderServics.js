import api from './apiInstance'

export const verifyVoucherAPI = async (code, subtotal) => {
try{
const response = await api.post('/vouchers/verify-voucher', {
 code,
 subtotal   
});
return response.data;
}catch(error){
  throw error?.response?.data || { message: "Server error occurred" };  
}
}

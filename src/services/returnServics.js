import axios from 'axios';

const api = axios.create({
  baseURL: 'https://kawsarshop-ecommerce-backend.onrender.com/api',
  // baseURL: 'http://localhost:5000/api',
  withCredentials: true,
})


export const getOrderDataForReturnAPI = async (orderId, token) => {
try{
const response = await api.get(`/returns/order-data/${orderId}`, {
 headers: { Authorization: `Bearer ${token}` } 
});
return response.data;
}catch(error){
const message = error.response?.data?.message || "Failed to load order data for return!";
throw new Error(message);
}
}


export const applyReturnAPI = async (returnData, token) => {
try {
  const response = await api.post('/returns/apply', returnData, {
    headers: { Authorization: `Bearer ${token}` }
  });
return response.data;
}catch (error) {
const message = error.response?.data?.message || "Return request failed!";
throw new Error(message);    
}
};


export const cancelReturnRequestAPI = async (returnId, token) => {
try {
const response = await api.put(`/returns/user-cancel`, {returnId}, {
  headers: { Authorization: `Bearer ${token}` }
});
return response.data;
}catch (error) {
const message = error.response?.data?.message || "Failed to cancel return request!";
throw new Error(message);
}
};



export const updateReturnStatusByAdminAPI = async (returnId, status, token) => {
try {
  const response = await api.put('/returns/admin-update', { returnId, status }, {
    headers: { Authorization: `Bearer ${token}` }
  });
return response.data;
}catch (error) {
const message = error.response?.data?.message || "Failed to update return status!";
throw new Error(message);
}
};


export const getUserReturnsHistoryAPI = async (token) => {
  try {
    const response = await api.get('/returns/user', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to load return history!";
    throw new Error(message);
  }
};



export const uploadReturnProblemImages = async (files) => {
try{
const uploadedUrls = [];
for (const file of files){
const formData = new FormData();
formData.append("file", file);
formData.append("upload_preset", "kawsar_shop_preset");
const res = await axios.post(
 "https://api.cloudinary.com/v1_1/dkmzakgx2/image/upload",
  formData
);
if (res.data?.secure_url) {
uploadedUrls.push(res.data.secure_url);
}
}
return uploadedUrls;
}
catch(error){
const clgError = error.response?.data?.error?.message || "Cloudinary Upload Failed!";
throw new Error(clgError);
}
}



export default api;
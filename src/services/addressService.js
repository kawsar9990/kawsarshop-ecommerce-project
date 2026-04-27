import axios from "axios";

const api = axios.create({
    baseURL: 'https://kawsarshop-ecommerce-backend.onrender.com/api',
    // baseURL: 'http://localhost:5000/api',
    withCredentials: true,
});


export const addAddressAPI = async (addressData) => {
try{
    const response = await api.post('/addresses/add', addressData);
    return response.data;
} catch (error) {
    throw error.response.data || { message: "Server error occurred" };
}
};




export const getAddressesAPI = async (id) => {
  try {
    const response = await api.get(`/addresses/user/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data || { message: "Server error occurred" };
  }
};





export const updateAddressAPI = async (id, updateData) => {
  try {
    const response = await api.put(`/addresses/update/${id}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response.data || { message: "Server error occurred" };
  }
};




export const deleteAddressAPI = async (id) => {
  try {
    const response = await api.delete(`/addresses/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data || { message: "Server error occurred" };
  }
};




export const setDefaultAddressAPI = async (id, userId) => {
  try {
    const response = await api.patch('/addresses/set-default', { id, userId });
    return response.data;
  } catch (error) {
    throw error.response.data || { message: "Server error occurred" };
  }
};



export default api;
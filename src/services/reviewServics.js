import axios from 'axios';

const api = axios.create({
  baseURL: 'https://kawsarshop-ecommerce-backend.onrender.com/api',
  // baseURL: 'http://localhost:5000/api',
  withCredentials: true,
})


export const createProductReview = async (reviewData, token) => {
  try {
    const response = await api.post('/reviews', {
      productId: reviewData.productId,
      orderId: reviewData.orderId,
      rating: reviewData.rating,
      comment: reviewData.comment
    }, {
      headers: { 
        Authorization: `Bearer ${token}` 
      }
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Review submission failed!");
  }
};



export const updateProductReview = async (reviewData, token) => {
try {
const response = await api.put('/reviews/update', reviewData, {
  headers: { 
    Authorization: `Bearer ${token}` 
  }
});
return response.data;
}catch (err) {
    throw new Error(err.response?.data?.message || "Update failed!");
}
};


export const deleteProductReview = async (data, token) => {
const response = await api.delete('/reviews/delete', {
  data: data,
  headers: {Authorization: `Bearer ${token}`}
});
return response.data
}



export default api;
import api from './apiInstance'



export const createProductReview = async (reviewData, token) => {
  try {
    const response = await api.post('/reviews', {
      productId: reviewData.productId,
      orderId: reviewData.orderId,
      rating: reviewData.rating,
      comment: reviewData.comment,
      images: reviewData.images || []
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


export const uploadReviewImages = async (files) => {
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
uploadedUrls.push(res.data.secure_url);
}
return uploadedUrls;
}
catch(error){
throw new Error("Cloudinary Upload Failed!");
}
}

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



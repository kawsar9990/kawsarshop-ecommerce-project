import axios from 'axios';

const api = axios.create({
  baseURL: 'https://kawsarshop-ecommerce-backend.onrender.com/api',
  withCredentials: true,
})

export const uploadAndSaveProfilePic = async (croppedFile, userId) => {
  try{
    const formData = new FormData();
    formData.append("file", croppedFile, "profile.jpg");
    formData.append("upload_preset", "kawsar_shop_preset");

    const cloudRes = await axios.post(
       "https://api.cloudinary.com/v1_1/dkmzakgx2/image/upload",
        formData
    )

  const imageUrl = cloudRes.data.secure_url;
  const response = await api.post('/auth/update-profile-pic', {
        userId: userId,
        imageUrl: imageUrl
   },{ withCredentials: true });

    return {...response.data, imageUrl};
  } 
  catch(err){
    throw new Error(err.response.data.message || "Upload failed!");
  } 
}


export const removeProfilePic = async (userId) => {
  try{
  const response = await api.post('/auth/update-profile-pic', {
    userId: userId,
    imageUrl: ""
  });
  return response.data;
  }
  catch(err){
   throw new Error(err.response.data.message || "Remove failed!");
  }
}


export const updateProfileName = async (userId, username) => {
  try{
    const response = await api.post('/auth/update-profile-name', {
      userId: userId,
      username: username
    });
    return response.data;
  }catch(err){
    throw new Error(err.response.data.message || "Update failed!");
  }
}



export const updateProfilePhone = async (userId, phone) => {
  try{
    const response = await api.post('/auth/update-phone', {
      userId: userId,
      phone: phone || "",
    });
    return response.data;
  }catch(err){
    throw new Error(err.response.data.message || "Update failed!");
  }
}




export const updateProfileDOB = async (userId, dob) => {
  try{
    const response = await api.post('/auth/update-dob', {
      userId: userId,
      dob,
    });
    return response.data;
  }catch(err){
    throw new Error(err.response.data.message || "Update failed!");
  }
}


export const updateProfileGender = async (userId, gender) => {
  try {
    const response = await api.post('/auth/update-gender', {
      userId: userId,
      gender: gender
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Update failed!");
  }
}


export const updateProfilePassword = async (passwordData) => {
  try{
    const response = await api.post('/auth/update-password', {
      userId: passwordData.userId,
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
      isSocialUser: passwordData.isSocialUser
    });
    return response.data
  }catch(err){
   throw new Error(err.response.data.message || "Password update failed!"); 
  }
}




export const updateProfileNewsletter = async (userId, newsletter) => {
  try {
    const response = await api.post('/auth/update-newsletter', {
      userId: userId,
      newsletter: newsletter
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message || "Update failed!");
  }
}
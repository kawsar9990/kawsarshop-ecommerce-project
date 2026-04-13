import axios from "axios";

const api = axios.create({
    baseURL: 'https://kawsarshop-ecommerce-backend.onrender.com/api',
    // baseURL: 'http://localhost:5000/api',
    withCredentials: true,
});

export const getProducts = async (category,isHomePage,isHomeTab,isFeatured,isLatest,isAllProduct) => {
    try {
    const response = await api.get('/all-products', {
        params : {
            category: category,
            isHomePage: isHomePage,
            isHomeTab: isHomeTab,
            isFeatured: isFeatured,
            isLatest: isLatest,
            isAllProduct: isAllProduct
        }
    });
    return response.data;
    }
    catch (error) {
    throw error;
    }
};



export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    } catch (err) {
        const message = err.response.data.message || "Login failed!";
        throw new Error(message);
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (err) {
        const message = err.response.data.message || "Registration failed!";
        throw new Error(message);
    }
};


export const getCaptcha = async () => {
    try{
        const response = await api.get('/auth/captcha');
        return response.data;
    }
    catch (err) {
        const message = err.response.data.message || "Captcha load failed!";
        throw new Error(message);
    }
}


export const resetPasswordWithDOB = async (payload) => {
    try{
        const response = await api.post('/auth/reset-password-dob', payload);
        return response.data;
    }
    catch (err) {
        const message = err.response.data.message || "Verification failed!";
        throw new Error(message);
    }
}



export default api;
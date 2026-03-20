import axios from "axios";

const api = axios.create({
    baseURL: 'https://kawsarshop-ecommerce-backend.onrender.com/api',
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
    console.error("API Call Error:", error);
    throw error;
    }
}

export default api;
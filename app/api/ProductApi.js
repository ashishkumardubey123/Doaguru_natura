import axios from "axios";

// const API_BASE_URL = "https://jaipurdentalhospital.dentalguru.software"
// const API_BASE_URL = "http://localhost:5000";
const API_BASE_URL = "https://natura-backend-xct1.onrender.com"
const getAuthConfig = (token) => ({
  withCredentials: true,
});

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/product/get/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const fetchProductFilters = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/product/filters`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product filters:", error);
        throw error;
    }
};

export const uploadProduct = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/product/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading product:", error);
        throw error;
    }
};

"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchProducts, uploadProduct } from "@/app/api/ProductApi";

export const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                // Jaisa humne console me check kiya tha, API data[0] me products bhej rahi hai.
                if (Array.isArray(data) && Array.isArray(data[0])) {
                     setProductsData(data[0]);
                } else if (Array.isArray(data)) {
                     setProductsData(data); // Safe fallback
                } else {
                     setProductsData([]);
                }
            } catch (error) {
                console.error("Failed to fetch products for context", error);
                setProductsData([]);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, []);

    const uploadNewProduct = async (formData) => {
        try {
            const data = await uploadProduct(formData);
            // After successful upload, re-fetch products to ensure UI gets updated
            const refreshed = await fetchProducts();
            if (Array.isArray(refreshed) && Array.isArray(refreshed[0])) {
                 setProductsData(refreshed[0]);
            } else if (Array.isArray(refreshed)) {
                 setProductsData(refreshed);
            }
            return { success: true, message: "Product uploaded successfully" };
        } catch (error) {
            console.error("Context error uploading product:", error);
            return { success: false, message: error.response?.data?.message || error.message || "Failed to upload product" };
        }
    };

    return (
        <ProductContext.Provider value={{ productsData, loading, uploadNewProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

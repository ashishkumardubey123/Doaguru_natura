"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchProducts, fetchProductFilters, uploadProduct } from "@/app/api/ProductApi";
import { withTherapyIcons, withDosageIcons } from "@/utils/utils";

export const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [productsData, setProductsData] = useState([]);
    const [therapyFilters, setTherapyFilters] = useState([]);
    const [dosageFilters, setDosageFilters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const [productsResult, filtersResult] = await Promise.allSettled([
                    fetchProducts(),
                    fetchProductFilters(),
                ]);
                let normalizedProducts = [];

                if (productsResult.status === "fulfilled") {
                    const data = productsResult.value;
                    if (Array.isArray(data) && Array.isArray(data[0])) {
                        normalizedProducts = data[0];
                    } else if (Array.isArray(data)) {
                        normalizedProducts = data;
                    } else {
                        normalizedProducts = [];
                    }
                    setProductsData(normalizedProducts);
                } else {
                    console.error("Failed to fetch products for context", productsResult.reason);
                    setProductsData([]);
                }

                if (filtersResult.status === "fulfilled") {
                    const filters = filtersResult.value;
                    setTherapyFilters(withTherapyIcons(filters?.therapyFilters, normalizedProducts));
                    setDosageFilters(withDosageIcons(filters?.dosageFilters, normalizedProducts));
                } else {
                    console.error("Failed to fetch filter values", filtersResult.reason);
                    // Fallback: derive filters from products if filters endpoint fails.
                    setTherapyFilters(withTherapyIcons([], normalizedProducts));
                    setDosageFilters(withDosageIcons([], normalizedProducts));
                }
            } catch (error) {
                console.error("Context initialization error:", error);
                setProductsData([]);
                setTherapyFilters([]);
                setDosageFilters([]);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, []);

    const uploadNewProduct = async (formData) => {
        try {
            await uploadProduct(formData);
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
        <ProductContext.Provider value={{ productsData, loading, therapyFilters, dosageFilters, uploadNewProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

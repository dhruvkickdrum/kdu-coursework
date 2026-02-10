import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import type { Product, ProductsResponse } from "../types/product";

const BASE_URL = "https://dummyjson.com/products";

interface ProductContextValue {
    products: Product[],
    searchQuery: string,
    selectedProduct: Product | null,
    loading: boolean,
    searchLoading: boolean,
    error: string | null,
    fetchAllProducts: () => Promise<void>,
    searchProducts: (query: string) => Promise<void>,
    fetchProductById: (id: number) => Promise<void>,
    setSearchQuery: (query: string) => void,
    clearSearch: () => void 
}

const ProductContext = createContext<ProductContextValue | undefined> (undefined)

async function handleResponse<Payload>(response:Response): Promise<Payload> {
    if(!response.ok) {
        const msg = `Request failed with status ${response.status}`;
        throw new Error(msg);
    }
    return (await response.json()) as Payload;
}

export function ProductProvider({ children }: {children: ReactNode}) {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQueryState] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAllProducts = useCallback(async () => {
        try {
            setLoading(true);
            setSearchLoading(false);
            setError(null);
            const response = await fetch(BASE_URL);
            const data = await handleResponse<ProductsResponse>(response);
            setProducts(data.products);
        } catch(error) {
            setError(error instanceof Error ? error.message: "Unable to load products");
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const searchProducts = useCallback(async (query: string) => {
        try {       
            setSearchLoading(true);
            setError(null);
            const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
            const data = await handleResponse<ProductsResponse>(response);
            setProducts(data.products); 
        } catch(error) {
            setError(error instanceof Error ? error.message: "Unable to search products");
            setProducts([]); 
        } finally {
            setSearchLoading(false);
        }
    }, []);

    const fetchProductById = useCallback(async (id: number) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${BASE_URL}/${id}`);
            const data = await handleResponse<Product>(response);
            setSelectedProduct(data);
        } catch(error) {
            setError(error instanceof Error ? error.message : "Unable to load products");
            setSelectedProduct(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const setSearchQuery = useCallback((query: string) => {
        setSearchQueryState(query);
    }, []);


    const clearSearch = useCallback(() => {
        setSearchQueryState('');
    }, []);

    useEffect(()=> {
        const trimmedQuery = searchQuery.trim();
        const timeout = window.setTimeout(() => {
            if(trimmedQuery) {
                void searchProducts(trimmedQuery);
            } else {
                void fetchAllProducts();
            }
        }, 500);

        return () => window.clearTimeout(timeout);
    }, [fetchAllProducts, searchProducts, searchQuery]);


    const value = useMemo(() => ({
        products, searchQuery, selectedProduct, loading, searchLoading, error, fetchAllProducts, searchProducts, fetchProductById, setSearchQuery, clearSearch
    }), [products, searchQuery, selectedProduct, loading, searchLoading, error, fetchAllProducts, searchProducts, fetchProductById, setSearchQuery, clearSearch],)

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
} 

export function useProductContext() {
    const context = useContext(ProductContext);
    if(!context) {
        throw new Error("useProductContext must be used within a ProductProvider");
    }
    return context;
}
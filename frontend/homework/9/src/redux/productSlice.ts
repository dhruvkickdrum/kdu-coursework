import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import type { Product, ProductsResponse } from "../types/product";

const BASE_URL = 'https://dummyjson.com/products';

interface ProductState {
    products: Product[]
    searchQuery: string
    selectedProduct: Product | null
    loading: boolean
    searchLoading: boolean
    error: string | null
}

const initialState: ProductState = {
    products: [],
    searchQuery: '',
    selectedProduct: null,
    loading: false,
    searchLoading: false,
    error: null
}

export const fetchAllProducts = createAsyncThunk('products/fetchAll', async () => {
    const response = await fetch(BASE_URL);
    return handleResponse<ProductsResponse>(response);
})

export const searchProducts = createAsyncThunk('products/search', async (query: string) => {
    const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
    return handleResponse<ProductsResponse>(response);
})

export const fetchProductById = createAsyncThunk('products/fetchById', async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    return handleResponse<Product>(response);
})

async function handleResponse<Product>(response : Response): Promise<Product> {
    if(!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }
    return (await response.json()) as Product;
}


const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSearchQuery(state, { payload }) {
            state.searchQuery = payload;
        },
        clearSearch(state) {
            state.searchQuery = '';
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllProducts.pending, (state) => {
            state.loading = true;
            state.searchLoading = false;
            state.error = null;
        })
        .addCase(fetchAllProducts.fulfilled, (state, { payload}) => {
            state.loading = false;
            state.searchLoading = false;
            state.products = payload.products;
        })
        .addCase(fetchAllProducts.rejected, (state, { error }) => {
            state.loading = false;
            state.searchLoading = false;
            state.products = [];
            state.error = error.message ?? "Unable to fetch products";
        }) 
        .addCase(searchProducts.pending, (state) => {
            state.loading = false;
            state.searchLoading = true;
            state.error = null;
        })
        .addCase(searchProducts.fulfilled, (state, action) => {
            state.searchLoading = false;
            state.products = action.payload.products;
        })
        .addCase(searchProducts.rejected, (state, {error}) => {
            state.searchLoading = false;
            state.products = [];
            state.error = error.message ?? "Unable to fetch products";
        })
        .addCase(fetchProductById.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.selectedProduct = null;
        })
        .addCase(fetchProductById.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.selectedProduct = payload;
        })
        .addCase(fetchProductById.rejected, (state, {error}) => {
            state.loading = false;
            state.selectedProduct = null;
            state.error = error.message ?? "Unable to fetch product";
        } )
    },
});

export const { setSearchQuery, clearSearch } = productSlice.actions;
export default productSlice.reducer;
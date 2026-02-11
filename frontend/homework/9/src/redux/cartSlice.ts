import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../types/product";

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}

const initialState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
}

const calculateTotals = (items: CartItem[]) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
    return {totalItems,totalPrice};
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, {payload}) {
            const product: Product = payload;
            const existing= state.items.find((item) => item.product.id === product.id);
            if(existing) {
                existing.quantity++;
            } else {
                state.items.push({product, quantity: 1});
            }
            Object.assign(state, calculateTotals(state.items));
        },
        removeFromCart(state, {payload}) {
            const id: number = payload;
            state.items = state.items.filter((item)=> item.product.id !== id);
            Object.assign(state,calculateTotals(state.items));
        },
        updateItemQuantity(state, {payload}) {
            const {id, quantity} = payload as {id: number, quantity: number};
            const item = state.items.find((item) => item.product.id === id);
            if(!item) return;
            if(quantity <= 0){
                state.items = state.items.filter((item) => item.product.id !== id);
            } else {
                item.quantity = quantity;
            }
            Object.assign(state, calculateTotals(state.items));
        },
        clearCart(state) {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
        },
    },
})

export const { addToCart, removeFromCart, updateItemQuantity, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
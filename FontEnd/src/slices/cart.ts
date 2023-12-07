import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import { toast } from 'react-toastify';

type CartProps = {
    cartItems: any[];
};

const initialState: CartProps = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<any>) => {
            let newProduct = action.payload;

            const itemIndex = state.cartItems.findIndex((item) => item?.size === newProduct.sizeId || item?.color === newProduct.color);

            // const itemId = state.cartItems.findIndex(item => item._id === newProduct._id)

            const existingProduct = state.cartItems.find((item) => item._id === newProduct._id);

            if (itemIndex < 0) {
                
                state.cartItems.push({
                    ...newProduct,
                    color: newProduct.color,
                    size: newProduct.size,
                    quantity: newProduct.quantity || 1,
                });
                message.success(`Đã thêm ${newProduct.name} vào giỏ hàng`);
            } else {

                if (existingProduct.color === newProduct.color || existingProduct.size !== newProduct.size) {
                    state.cartItems.push({
                        ...newProduct,
                        color: newProduct.color,
                        size: newProduct.size,
                        quantity: newProduct.quantity || 1,
                    });
                    message.success(`Đã thêm ${newProduct.name} vào giỏ hàng`);
                } else if (existingProduct.color !== newProduct.color || existingProduct.size === newProduct.size) {
                    state.cartItems.push({
                        ...newProduct,
                        color: newProduct.color,
                        size: newProduct.size,
                        quantity: newProduct.quantity || 1,
                    });
                    message.success(`Đã thêm ${newProduct.name} vào giỏ hàng`);
                } else {
                    state.cartItems[itemIndex].quantity++;
                    message.success(`Đã thêm ${newProduct.name} vào giỏ hàng`);
                }
            }

        },
        increase: (state, action: PayloadAction<number>) => {
            const currentProduct = state.cartItems.find((_item, index) => index === action.payload);
            currentProduct.quantity++;
        },
        decrease: (state, action: PayloadAction<number>) => {
            const currentProduct = state.cartItems.find((_item, index) => index === action.payload);
            currentProduct.quantity--;

            if (currentProduct.quantity < 1) {
                state.cartItems = state.cartItems.filter((_item, index) => index !== action.payload);
                currentProduct.quantity = 1;
                toast.info(`Đã xóa khỏi giỏ hàng`, {
                    position: 'bottom-right',
                });
            }
        },
        remove: (state, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter((_item, index) => index !== action.payload);

            toast.info(`Đã xóa khỏi giỏ hàng`, {
                position: 'bottom-right',
            });
        },
        clear: (state) => {
            state.cartItems = [];
            toast.info(`Giỏ hàng đã được dọn sạch`, {
                position: 'bottom-right',
            });
        },
    },
});

export const { addToCart, increase, decrease, clear, remove } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

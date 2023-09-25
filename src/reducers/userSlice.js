import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        login: (state, action) => {
            return action.payload;
        },
        logout: (state) => {
            return null;
        },
        updateAvatar: (state, action) => {
            return {
                ...state,
                avatar: action.payload,
            };
        },
        updateCart: (state, action) => {
            return {
                ...state,
                cart: action.payload,
            };
        },
        setQuanityInCart: (state, action) => {
            let cart = [...state.cart].map((item) => {
                if (item._id === action.payload.id) {
                    return {
                        ...item,
                        quantity: action.payload.quantity,
                    };
                }
                return { ...item };
            });

            return {
                ...state,
                cart: cart,
            };
        },
        insertAddress: (state, action) => {
            const addresses = [...state.addresses];
            return {
                ...state,
                addresses: [...addresses, action.payload],
            };
        },
        changeAddressDefault: (state, action) => {
            // index
            const index = action.payload;
            const addresses = [...state.addresses];
            const swap = addresses[index];
            addresses[index] = addresses[0];
            addresses[0] = swap;
            return {
                ...state,
                addresses: addresses,
            };
        },
        deleteAddress: (state, action) => {
            const addresses = [...state.addresses].filter(
                (address) => address._id !== action.payload
            );
            return {
                ...state,
                addresses: addresses,
            };
        },
    },
});

export const {
    login,
    logout,
    updateAvatar,
    updateCart,
    insertAddress,
    changeAddressDefault,
    deleteAddress,
    setQuanityInCart,
} = userSlice.actions;

export default userSlice.reducer;

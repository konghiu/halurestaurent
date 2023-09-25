import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        list: [],
        count: 0,
    },
    reducers: {
        setNotify: (state, action) => {
            const payload = action.payload;
            let arr = [...state.list];
            let count = 1;
            if (Array.isArray(payload)) {
                arr = [...arr, ...payload];
                count = payload.filter((item) => !item.checked).length;
            } else arr = [...state.list, payload];

            return {
                ...state,
                list: [...arr],
                count: state.count + count,
            };
        },
        updateNotify: (state, payload) => {
            let arr = [...state.list].map((item) => {
                if (item.checked === false) {
                    return { ...item, checked: true };
                }
                return { ...item };
            });

            return {
                ...state,
                list: [...arr],
            };
        },
        removeNotify: (state, action) => {
            let arr = [...state.list];
            arr = arr.filter((item) => item.id !== action.payload);
            return {
                ...state,
                list: [...arr],
                count: state.count - 1,
            };
        },
        setCountNotify: (state, action) => {
            return {
                ...state,
                count: state.count + action.payload,
            };
        },
        clearNotify: (state, action) => {
            return {
                ...state,
                list: [],
                count: 0,
            };
        },
    },
});

export const {
    setNotify,
    removeNotify,
    clearNotify,
    setCountNotify,
    updateNotify,
} = notificationSlice.actions;

export default notificationSlice.reducer;

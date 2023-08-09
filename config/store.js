import { configureStore } from "@reduxjs/toolkit";
import { postSlice } from "../slices/postSlice";
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () => configureStore({
    reducer: {
        [postSlice.name]: postSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
 })

export const wrapper = createWrapper(makeStore);
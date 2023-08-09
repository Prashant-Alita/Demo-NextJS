import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    postRequest: false,
    postArray: [],
    postError: null,

    singlePostRequest: false,
    singlePostSuccess: {},
    singlePostError: null,

    updatePostRequest: false,
    updatePostSuccess: {},
    updatePostError: null,
}

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        getPostReuqest: (state, action) => {
            state.postRequest = true

        },

        getPosts: (state, action) => {
            state.postRequest = false
            state.postArray = action.payload
            state.postError = null
        },

        getPostError: (state, action) => {
            state.postError = action.payload
        }
        ,
        getSinglePostRequest: (state, action) => {
            state.singlePostRequest = true;
            state.singlePostError = null
        },
        getSinglePostSuccess: (state, action) => {
            state.singlePostRequest = false;
            state.singlePostSuccess = action.payload;
        },
        getSinglePostError: (state, action) => {
            state.singlePostError = action.payload
        },
        updateRequest: (state, action) => {
            state.updatePostRequest = true
            state.updatePostError = null
        },
        updateSuccess: (state, action) => {
            state.updatePostRequest = false
            state.updatePostSuccess = action.payload
            state.updatePostError = null
        },
        updateError: (state, action) => {
            state.updatePostRequest = false
            // state.updatePostSuccess = {}
            state.updatePostError = action.payload
        },
    }, extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
})

export const { getPosts, getPostReuqest, getPostError, getSinglePostRequest, getSinglePostSuccess, getSinglePostError, updateRequest, updateSuccess, updateError } = postSlice.actions
export const selectAllPosts = (state) => state.post.postArray;
export const updatedPost = (state) => state.post.updatePostSuccess;
export default postSlice.reducer
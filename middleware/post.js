import { getPosts, getPostReuqest, getPostError, getSinglePostRequest, getSinglePostSuccess, getSinglePostError, updateSuccess, updateRequest, updateError } from "../slices/postSlice"
import postServices from "../services/post"


export const PostMiddleWare = (payload) => {
    return (dispatch) => {
        dispatch(getPostReuqest())
        postServices.getAllPost().then((response) => {
            const { status, data, error } = response
            if (status === 200) {
                dispatch(getPosts(data))
            } else {
                dispatch(getPostError(error))
            }
        }).catch((error) => {
            dispatch(getPostError(error));
        })
    }
}

export const getSingle = (payload) => {
    return (dispatch) => {
        dispatch(getSinglePostRequest())
        postServices.getSingle(payload).then((response) => {
            const { status, data, error } = response
            if (status === 200) {
                dispatch(getSinglePostSuccess(data))
            } else {
                dispatch(getSinglePostError(error))
            }
        }).catch((error) => {
            dispatch(getSinglePostError(error));
        })
    }
}

export const updateSingle = (id,payload) => {
    return (dispatch) => {
        dispatch(updateRequest())
        postServices.updatePost(id,payload).then((response) => {
            const { status, data, error } = response
            if (status === 200) {
                dispatch(updateSuccess(data))
            } else {
                dispatch(updateError(error))
            }
        }).catch((error) => {
            dispatch(updateError(error));
        })
    }
}
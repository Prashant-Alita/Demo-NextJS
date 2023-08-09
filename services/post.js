import { del, get, post, put } from ".";

const URI ="/users"
const getAllPost = (payload) => {
    const URL = `${URI}`;
    return get(URL, payload);
};

const getSinglePost = (payload) => {
    const URL = `${URI}/${payload}`;
    return get(URL, payload);
};

// Social Login service
const getSingle = (payload) => {
    const URL = `${URI}/sociallogin`;
    return post(URL, payload);
};

const addSingle = (payload) => {
    const URL = `${URI}`;
    return post(URL, payload);
};
const updatePost = (id,payload) => {
    const URL = `${URI}/${id}`;
    return put(URL, payload);
};

const deletePost = (payload) => {
    const URL = `${URI}/signup`;
    return del(URL, payload);
};

const postServices = {
getSingle,
getAllPost,
updatePost,
    deletePost,
    getSinglePost,
    addSingle
}
export default postServices
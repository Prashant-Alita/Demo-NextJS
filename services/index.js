import axios from "axios"

const axiosApi = axios.create({
    baseURL: "https://gorest.co.in/public/v2",
})

axiosApi.interceptors.request.use(
    (config) => {
        const token = "77593c715fa353240a395e7a8767334b4a36c39f66ba95a076e63758a415ee37"
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error),
)

axiosApi.interceptors.response.use(
    (response) => response,
    (error) => {
        const { data, status } = error.response
        if (status === SERVER_AUTH_ERROR_STATUS_CODE) {
            LocalStorageService.logoutUser();
            // window.location.replace("/auth/login");
            return Promise.reject(INVALID_USER);
        }
        if (status === SERVER_VALIDATION_STATUS_CODE) {
            const { error } = data
            const errorsArray = []
            for (const key in error) {
                if (Object.hasOwnProperty.call(error, key)) {
                    const _error = error[key]
                    errorsArray.push(_error)
                }
            }
            return Promise.reject(errorsArray)
        }
        return Promise.reject(GENERIC_ERROR_MESSAGE)
    },
)

export async function get(url, config = {}) {
    return await axiosApi.get(url, { ...config })
}

export async function post(url, data, config = {}) {
    return axiosApi.post(url, { ...data }, { ...config });
}

export async function put(url, data, config = {}) {
    return axiosApi.put(
        url,
         data,
        { ...config },
    )
}

export async function del(url, config = {}) {
    return await axiosApi.delete(url, {
        'Content-Type': 'text/plain',
        ...config,
    })
}
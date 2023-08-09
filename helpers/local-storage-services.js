

const getValue = () => {
    const value = localStorage?.getItem("user")
    return value
}

const setValue = (data) => {
    localStorage.setItem("user", JSON.stringify(data))
}

const localStorageServices = {
    getValue, setValue
}

export default localStorageServices;
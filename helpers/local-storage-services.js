

const getValue = () => {
    const value = localStorage?.getItem("user")
    return value
}

const setValue = (data) => {
    localStorage.setItem("user", JSON.stringify(data))
}
const removeItem = () => {
    localStorage.removeItem("user")
}

const localStorageServices = {
    getValue, setValue ,removeItem
}

export default localStorageServices;

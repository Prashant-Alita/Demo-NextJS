import { useState } from "react";
import localStorageServices from "../../helpers/local-storage-services";
import { useRouter } from "next/router";

function login() {
    const [userData, setUserData] = useState({ email: "", password: "" })
    const router = useRouter()
    const handleChange = ({target}) => {
        const { name, value } = target
        setUserData((prev) => {
            return {...prev,[name]:value}
        })
    }
    return (<>
        <label >Enter Email:- </label>
        <input name="email" type="text" onChange={handleChange} />

        <label>Enter Password</label>
        <input name="password" type="password" onChange={handleChange} />

        <button onClick={() => {
            if (userData?.email) {
            localStorageServices.setValue(userData.email)
            router.push("/")
            }
        }}>Login</button>
    </>);
}

export default login;
import { useRouter } from "next/router";
import { useState } from "react";
import postServices from "../../services/post";

const addPost = () => {
    const [data, setData] = useState({name:"",email:"",gender:"male",status:"inactive"})
    const router = useRouter()
    const handleChange = ({target}) => {
        const { value ,name} = target;

        setData((prev) => {
            return {...prev, [name]:value}
        })
    }

    const submit = () => {
        postServices.addSingle(data)
        router.push("/")
    }
    return <>
        <label>User name</label>
        <input type="text" name="name" onChange={handleChange} value={data.name} />
        
        <label>User email</label>
        <input type="text" name="email" onChange={handleChange} value={data.email} />

        <button onClick={submit} className="btn">Submit</button>
        {/* <button onClick={()=>router.push("/")}>Back to home</button> */}
    </>
}

export default addPost;
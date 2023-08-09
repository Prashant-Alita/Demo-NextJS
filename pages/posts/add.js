import { useState } from "react";

const addPost = () => {
    const [data, setData] = useState("")

    const handleChange = ({target}) => {
        const { value } = target;

        setData(value)
    }
    return <>
        <label>Enter Post here...</label>
        <input type="text" onChange={handleChange} value={data} />
        
        <button>Submit</button>
    </>
}

export default addPost;
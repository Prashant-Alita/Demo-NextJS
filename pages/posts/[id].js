import Layout from "../../public/components/layout";
import { useRouter } from "next/router";
import RouteAuthGuard from "../../public/components/route-auth-guard";
import { useEffect, useState } from "react";
import postServices from "../../services/post";
import { selectAllPosts, updatedPost } from "../../slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateSingle } from "../../middleware/post";

export async function getStaticPaths() {
    const allPostsData = await postServices.getAllPost().then((value) => { return value.data })
    
    const paths = allPostsData.map((value) => {
        return {
            params: {
                id: value.id.toString()
            }
        }
    })
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps(context) {

    const data = await postServices.getSinglePost(context.params.id).then((value) => { return value.data })
    return {
        props: {
            data
        }
    };
}
function Post({ data }) {
    const {id,name} = data
    const [user, setUser] = useState({ name })
    const updatedUser = useSelector(updatedPost)
    const dispatch = useDispatch()
    
    useEffect(() => {
        console.log(updatedUser,"updatedUser");
    }, [updatedUser])
    const handleChange = ({ target }) => {
        const { value } = target
        setUser((prev) => {
            return { ...prev, name: value }
        })
    }

    const submit = () => {

        dispatch(updateSingle(id,user))
    }
    return <>
        <Layout>

            {/* <Head>
            <title>{data.title}</title>
        </Head> */}
            <label>Enter name here:- </label>
            <input type="text" onChange={handleChange} value={user.name} />
            <button onClick={submit}>Update</button>
            {/* <button onClick={()=>alert("new tab")}>"click here</button> */}
        </Layout>
    </>
}

export default RouteAuthGuard(Post)
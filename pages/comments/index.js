import useSWR from 'swr'
import axios from 'axios';

export default function Single() {
    const { data, error } = useSWR('https://gorest.co.in/public/v2/comments', axios)

    console.log(data,"data");
    return (<div>
        <h1>Hello</h1>
        {/* {
            value.map((data) => {
                <p>{data.name}</p>
            })
        } */}
    </div>)
}
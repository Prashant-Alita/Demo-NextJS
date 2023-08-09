async function comments() {
    
    let data = await fetch("https://gorest.co.in/public/v2/comments")
    data = await data.json()
    return data
}

export default  function Single() {
    let value =  comments().then((data)=>data)

    console.log(value, "value");
    return (<div>
        <h1>Hello</h1>
        {/* {
            value.map((data) => {
                <p>{data.name}</p>
            })
        } */}
    </div>)
}
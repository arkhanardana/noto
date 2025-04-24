const GetTask = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/todos/api/todos")
        const data =await  res.json()

        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export default GetTask
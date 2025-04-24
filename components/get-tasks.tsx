const GetTask = async () => {
    try {
        const res = await fetch("/api/todos")
        const data =await  res.json()

        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export default GetTask
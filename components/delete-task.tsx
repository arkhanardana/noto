const DeleteTask = async ({id}) => {
    try {
        const res = await fetch(`http://localhost:3000/api/todos/api/todos/${id}`, {
            method: "DELETE"
        })
        const data =await  res.json()

        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export default DeleteTask
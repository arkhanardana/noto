type UserProps = {
    titles: string,
    descs: string,
    priorities: string,
    dates: string,
    id: number
  };

const UpdateTask = async ({titles, descs, priorities, dates, id}: UserProps) => {
    try {
        const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                "title": titles,
                "desc" : descs,
                "priority": priorities,
                "deadline": dates
            })
        })
        const data = await  res.json()

        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export default UpdateTask
import { toast } from "sonner"

const DeleteTask = async (id:number) => {
    try {
        await fetch(`http://localhost:3000/api/todos/${id}`, {
            method: "DELETE"
        })

        toast.success("Task deleted successfully")
    } catch (error) {
        console.log(error)
    }
}

export default DeleteTask
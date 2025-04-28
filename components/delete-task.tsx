import { toast } from "sonner";

const DeleteTask = async (id: number) => {
  try {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });

    toast.success("Task deleted successfully");
  } catch (error) {
    console.log(error);
  } finally {
    window.location.reload();
  }
};

export default DeleteTask;

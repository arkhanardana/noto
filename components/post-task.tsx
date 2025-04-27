import { toast } from "sonner";

type Status = "PROGRESS" | "COMPLETED";
type Priority = "LOW" | "MEDIUM" | "HIGH";

const PostTask = async (
  titles: string,
  descriptions: string,
  statuses: Status,
  priorities: Priority,
  deadlines: string,
  onClose: ()=> void
) => {
  try {
    await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titles, 
        description: descriptions, 
        status: statuses,
        priority: priorities,
        deadline: deadlines,
      }),
    });

    toast.success("Successfully create task")
  } catch (error) {
    console.log(error);
    toast.error("Failed to create task")
  } finally{
    onClose()
  }
};

export default PostTask;

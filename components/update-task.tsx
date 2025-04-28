import { toast } from "sonner";

type Status = "PROGRESS" | "COMPLETED";
type Priority = "LOW" | "MEDIUM" | "HIGH";

const UpdateTask = async (
  titles: string,
  descriptions: string,
  statuses: Status,
  priorities: Priority,
  deadlines: Date,
  onClose: () => void,
  id: number
) => {
  try {
    const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "PUT",
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
    const data = await res.json();

    console.log(data);
    toast.success("Successfully update task");
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Failed to update task");
  } finally {
    onClose();
    window.location.reload();
  }
};

export const UpdateStatus = async (statuses: Status, id: number) => {
  try {
    const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: statuses,
      }),
    });
    const data = await res.json();

    console.log(data);
    toast.success("Successfully update task's status");
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Failed to update task's status");
  } finally {
    window.location.reload();
  }
};

export default UpdateTask;

import { formatDistanceToNow } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Todo = {
  id: number;
  title: string;
  description: string;
  status: "PROGRESS" | "COMPLETED";
  deadline: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  user: {
    name: string;
  };
};

type TodosTableProps = {
  todos: Todo[];
};

export function TodosTable({ todos }: TodosTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="hidden md:table-cell">Deadline</TableHead>
            <TableHead>Created by</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-6 text-muted-foreground"
              >
                No todos found
              </TableCell>
            </TableRow>
          ) : (
            todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell className="font-medium">{todo.title}</TableCell>
                <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                  {todo.description}
                </TableCell>
                <TableCell>
                  <StatusBadge status={todo.status} />
                </TableCell>
                <TableCell>
                  <PriorityBadge priority={todo.priority} />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDistanceToNow(new Date(todo.deadline), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell>{todo.user.name}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function StatusBadge({ status }: { status: Todo["status"] }) {
  const variants = {
    PROGRESS: "bg-yellow-400 text-black",
    COMPLETED: "bg-main text-black",
  };

  return (
    <Badge variant="neutral" className={`${variants[status]}`}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </Badge>
  );
}

function PriorityBadge({ priority }: { priority: Todo["priority"] }) {
  const variants = {
    LOW: "bg-main text-black",
    MEDIUM: "bg-yellow-400 text-black",
    HIGH: "bg-red-400 text-black",
  };

  return (
    <Badge variant="neutral" className={`${variants[priority]}`}>
      {priority.charAt(0) + priority.slice(1).toLowerCase()}
    </Badge>
  );
}

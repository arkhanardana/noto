import { Hono } from "hono";
import { z } from "zod";
import db from "@/lib/db";

export const todo = new Hono();

const todoSchema = z.object({
  todoname: z.string().max(30),
  status: z.enum(["TODO", "PROGRESS", "COMPLETED"]).optional(),
  deadline: z.string().datetime(),
  userId: z.string(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
});

todo.get("/", async (c) => {
  const todos = await db.todo.findMany();
  return c.json(todos);
});

todo.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const todo = await db.todo.findUnique({ where: { id } });
  if (!todo) return c.notFound();
  return c.json(todo);
});

todo.post("/", async (c) => {
  const body = await c.req.json();
  const parsed = todoSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error }, 400);

  const {
    todoname,
    deadline,
    status = "TODO",
    userId,
    priority = "LOW",
  } = parsed.data;

  const newTodo = await db.todo.create({
    data: {
      userId,
      todoname,
      deadline: new Date(deadline),
      status,
      priority,
    },
  });

  return c.json(newTodo, 201);
});

todo.put("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  const parsed = todoSchema.partial().safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error }, 400);

  const updated = await db.todo.update({
    where: { id },
    data: {
      ...parsed.data,
      deadline: parsed.data.deadline
        ? new Date(parsed.data.deadline)
        : undefined,
    },
  });

  return c.json(updated);
});

todo.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  await db.todo.delete({ where: { id } });
  return c.json({ message: "Todo deleted" });
});

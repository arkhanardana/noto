import { Hono } from "hono";
import db from "@/lib/db";
import { sessionMiddleware } from "../middlewares/session";
import { todoSchema } from "./todo.schema";

export const todo = new Hono();

todo.use("*", sessionMiddleware);

todo.get("/", async (c) => {
  const user = c.get("user");
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const todos = await db.todo.findMany({
    where: { userId: user.id },
  });

  return c.json(todos);
});

todo.get("/:id", async (c) => {
  const user = c.get("user");
  const id = Number(c.req.param("id"));

  const todo = await db.todo.findUnique({ where: { id } });

  if (!todo || todo.userId !== user?.id) {
    return c.notFound();
  }

  return c.json(todo);
});

todo.post("/", async (c) => {
  const user = c.get("user");
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const body = await c.req.json();
  const parsed = todoSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error }, 400);

  const { todoname, deadline, status = "TODO", priority = "LOW" } = parsed.data;

  const newTodo = await db.todo.create({
    data: {
      todoname,
      deadline: new Date(deadline),
      status,
      priority,
      userId: user.id,
    },
  });

  return c.json(newTodo, 201);
});

todo.put("/:id", async (c) => {
  const user = c.get("user");
  const id = Number(c.req.param("id"));

  const existing = await db.todo.findUnique({ where: { id } });
  if (!existing || existing.userId !== user?.id) return c.notFound();

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
  const user = c.get("user");
  const id = Number(c.req.param("id"));

  const existing = await db.todo.findUnique({ where: { id } });
  if (!existing || existing.userId !== user?.id) return c.notFound();

  await db.todo.delete({ where: { id } });
  return c.json({ message: "Todo deleted" });
});

import { Hono } from "hono";
import db from "@/lib/db";
import { sessionMiddleware } from "../middlewares/session";
import { todoSchema } from "./todos.schema";
import { AppBindings } from "../lib/types";
import { zValidator } from "@hono/zod-validator";

type TodoStatus = "PROGRESS" | "COMPLETED";
type TodoPriority = "LOW" | "MEDIUM" | "HIGH";
export const todo = new Hono<AppBindings>();

todo.use("*", sessionMiddleware);

todo.get("/", async (c) => {
  const todos = await db.todo.findMany({
    include: {
      user: true,
    },
  });

  return c.json(todos);
});

todo.get("/search", async (c) => {
  const user = c.get("user");
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const q = c.req.query("q") || "";
  const status = c.req.query("status") as TodoStatus;
  const priority = c.req.query("priority") as TodoPriority;

  const todos = await db.todo.findMany({
    where: {
      userId: user.id,
      AND: [
        q
          ? {
              OR: [
                { title: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
              ],
            }
          : {},
        status ? { status } : {},
        priority ? { priority } : {},
      ],
    },
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

todo.post("/", zValidator("json", todoSchema), async (c) => {
  const user = c.get("user");
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const {
    title,
    description,
    deadline,
    status = "PROGRESS",
    priority = "LOW",
  } = c.req.valid("json");

  const newTodo = await db.todo.create({
    data: {
      userId: user.id,
      title,
      description,
      deadline: new Date(deadline),
      status,
      priority,
    },
  });

  return c.json(newTodo, 201);
});

todo.put("/:id", zValidator("json", todoSchema.partial()), async (c) => {
  const user = c.get("user");
  const id = Number(c.req.param("id"));

  const existing = await db.todo.findUnique({ where: { id } });
  if (!existing || existing.userId !== user?.id) return c.notFound();

  const data = c.req.valid("json");
  const updated = await db.todo.update({
    where: { id },
    data: {
      ...data,
      deadline: data.deadline ? new Date(data.deadline) : undefined,
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

import { Hono } from "hono";
import db from "@/lib/db";
import { sessionMiddleware } from "../middlewares/session";
import { todoSchema } from "./todos.schema";
import { AppBindings } from "../lib/types";

export const todo = new Hono<AppBindings>();

todo.use("*", sessionMiddleware);

todo.get("/", (c) => {
  const todos = db.todo.findMany();

  return c.json(todos);
});

/**
 * GET /api/todos
 * GET all todo milik user yang sedang login
 */
todo.get("/", async (c) => {
  const user = c.get("user");
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const todos = await db.todo.findMany({
    where: { userId: user.id },
  });

  return c.json(todos);
});

/**
 * GET /api/todos/search?q=keyword&status=TODO&priority=HIGH
 * Cari todo berdasarkan:
 * - q (keyword di todoname)
 * - status (TODO, PROGRESS, COMPLETED)
 * - priority (LOW, MEDIUM, HIGH)
 */
todo.get("/search", async (c) => {
  const user = c.get("user");
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const q = c.req.query("q") || "";
  const status = c.req.query("status");
  const priority = c.req.query("priority");

  const todos = await db.todo.findMany({
    where: {
      userId: user.id,
      ...(q && {
        todoname: {
          contains: q,
          mode: "insensitive",
        },
      }),
      ...(status && { status }),
      ...(priority && { priority }),
    },
  });

  return c.json(todos);
});

/**
 * GET /api/todos/:id
 * Ambil 1 todo berdasarkan ID (hanya milik sendiri)
 */
todo.get("/:id", async (c) => {
  const user = c.get("user");
  const id = Number(c.req.param("id"));

  const todo = await db.todo.findUnique({ where: { id } });

  if (!todo || todo.userId !== user?.id) {
    return c.notFound();
  }

  return c.json(todo);
});

/**
 * POST /api/todos
 * Tambah todo baru
 * Body:
 * {
 *   "todoname": "Belajar Reaksi",
 *   "deadline": "2025-05-01T15:00:00.000Z",
 *   "status": "TODO",
 *   "priority": "LOW"
 * }
 */
todo.post("/", async (c) => {
  const user = c.get("user");
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const body = await c.req.json();
  const parsed = todoSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error }, 400);

  const { todoname, deadline, status = "TODO", priority = "LOW" } = parsed.data;

  const newTodo = await db.todo.create({
    data: {
      userId: user.id,
      todoname,
      deadline: new Date(deadline),
      status,
      priority,
    },
  });

  return c.json(newTodo, 201);
});

/**
 * PUT /api/todos/:id
 * Edit todo berdasarkan ID (hanya milik sendiri)
 * Body:
 * {
 *   "todoname": "Ngodonf lebih rajin jir",
 *   "status": "PROGRESS",
 *   "deadline": "2025-05-03T15:00:00.000Z",
 *   "priority": "HIGH"
 * }
 */
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

/**
 * DELETE /api/todos/:id
 * Hapus todo berdasarkan ID
 */
todo.delete("/:id", async (c) => {
  const user = c.get("user");
  const id = Number(c.req.param("id"));

  const existing = await db.todo.findUnique({ where: { id } });
  if (!existing || existing.userId !== user?.id) return c.notFound();

  await db.todo.delete({ where: { id } });
  return c.json({ message: "Todo deleted" });
});

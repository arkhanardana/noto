import { Hono } from "hono";
import { todo } from "./todo/todo.routes";

const app = new Hono();

app.basePath("/api").route("/todos", todo);

export default app;

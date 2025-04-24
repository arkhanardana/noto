import { Hono } from "hono";
import { todo } from "./todos/todos.handler";

const app = new Hono();

app.basePath("/api").route("/todos", todo);

export default app;

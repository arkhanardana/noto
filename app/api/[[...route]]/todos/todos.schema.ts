import { z } from "zod";

export const todoSchema = z.object({
  todoname: z.string().max(30),
  status: z.enum(["TODO", "PROGRESS", "COMPLETED"]).optional(),
  deadline: z.string().datetime(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
});

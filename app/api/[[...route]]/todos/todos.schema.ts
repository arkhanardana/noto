import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().max(255),
  description: z.string().max(255),
  status: z.enum(["PROGRESS", "COMPLETED"]).optional(),
  deadline: z.string().datetime(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
});

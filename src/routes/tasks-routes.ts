import { FastifyInstance } from "fastify";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks-controllers.js";

export function tasksRoutes(app: FastifyInstance) {
  app.get("/tasks", getTasks);
  app.post("/tasks", createTask);
  app.patch("/tasks/:id", updateTask);
  app.delete("/tasks/:id", deleteTask);
}

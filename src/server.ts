import fastify from "fastify";
import { z } from "zod";
import { prisma } from "./database/prisma-database.js";

const app = fastify();

app.get("/", () => {
  return "Hello World!";
});

app.post("/tasks", async (request, reply) => {
  try {
    const createNewTask = z.object({
      description: z.string(),
    });

    const data = createNewTask.parse(request.body);

    const task = await prisma.task.create({
      data: {
        description: data.description,
      },
    });

    return reply.status(201).send(task);
  } catch (error) {
    return reply.status(500).send("Internal Server Error");
  }
});

app
  .listen({ port: 3333 })
  .then(() => console.log("Server running on port 3333!"));

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { prisma } from "../database/prisma-database.js";

export async function getTasks() {
  const tasks = await prisma.task.findMany();

  return tasks;
}

export async function createTask(request: FastifyRequest, reply: FastifyReply) {
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
}

export async function updateTask(request: FastifyRequest, reply: FastifyReply) {
  try {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const bodySchema = z.object({
      is_completed: z.boolean(),
    });

    const { id } = paramsSchema.parse(request.params);
    const { is_completed } = bodySchema.parse(request.body);

    const taskToUpdate = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted: is_completed,
      },
    });

    return taskToUpdate;
  } catch (error) {
    return reply.status(500).send("Internal Server Error");
  }
}

export async function deleteTask(request: FastifyRequest, reply: FastifyReply) {
  try {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    await prisma.task.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return reply.status(500).send("Internal Server Error");
  }
}

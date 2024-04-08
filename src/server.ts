import fastify from "fastify";

import { tasksRoutes } from "./routes/tasks-routes.js";

const app = fastify();

tasksRoutes(app);

app
  .listen({ port: 3333 })
  .then(() => console.log("Server running on port 3333!"));

import fastify from "fastify";
import fastifyCors from "@fastify/cors";

import { tasksRoutes } from "./routes/tasks-routes.js";

const app = fastify();
app.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
});

tasksRoutes(app);

app
  .listen({ port: 3333 })
  .then(() => console.log("Server running on port 3333!"));

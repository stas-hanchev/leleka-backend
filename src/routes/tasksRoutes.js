
import { celebrate } from "celebrate";
import { getAllTasks, createTask, updateTask } from "../controllers/tasksController.js";
import { createTaskSchema, updateTaskSchema } from "../validations/taskValidation.js";
import { authenticate } from "../middleware/authenticate.js";
import { Router } from "express";

const tasksRoutes = Router();


tasksRoutes.use(authenticate);

tasksRoutes.get("/tasks", getAllTasks);

tasksRoutes.post("/tasks", celebrate(createTaskSchema), createTask);

tasksRoutes.patch("/tasks/:taskId/status", celebrate(updateTaskSchema), updateTask);

export default tasksRoutes;

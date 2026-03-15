import express from "express";
import * as Controllers from "./taskController.js";

const taskRouter = express.Router({ mergeParams: true });

taskRouter.get("/", Controllers.getAll);
taskRouter.post("/", Controllers.create);
taskRouter.post("/:taskId", Controllers.update);
taskRouter.delete("/:taskId", Controllers.remove);

export default taskRouter;

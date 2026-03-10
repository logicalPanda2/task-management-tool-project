import express from "express";
import * as Controllers from "./commentController.js";

const commentRouter = express.Router({ mergeParams: true });

commentRouter.get("/", Controllers.getAll);
commentRouter.post("/", Controllers.create);
commentRouter.delete("/:commentId", Controllers.remove);

export default commentRouter;

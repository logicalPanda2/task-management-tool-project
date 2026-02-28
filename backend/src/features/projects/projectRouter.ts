import express from "express";

const projectRouter = express.Router();

projectRouter.get("/");
projectRouter.get("/:projectId");
projectRouter.post("/:projectId");
projectRouter.delete("/:projectId");

export default projectRouter;

import type { Request, Response } from "express";
import * as taskRepo from "./taskRepo.js";
import { isTask, isTaskArray } from "../../shared/utils/typeGuards.js";

export async function getAll(req: Request, res: Response, next: (...args: any[]) => any) {
    try {
        if(
            !("projectId" in req.params) ||
            typeof req.params.projectId !== "string"
        ) return res.sendStatus(400);

        const projectId = req.params.projectId;
        const tasks = await taskRepo.getAllByProjectId(projectId);

        res.json({
            tasks: tasks
        });
    } catch(e) {
        next(e);
    }

    return undefined;
}

export async function create(req: Request, res: Response, next: (...args: any[]) => any) {
    try {
        if(
            !("projectId" in req.params) ||
            typeof req.params.projectId !== "string"
        ) return res.sendStatus(400);

        const projectId = req.params.projectId;
        const tasks = req.body;

        if(isTaskArray(tasks)) {
            const task = tasks[0];
            
            if(isTask(task)) await taskRepo.createMany(tasks, projectId);
        } else if(isTask(tasks)) {
            await taskRepo.create(tasks, projectId);
        } else res.sendStatus(400);

        res.sendStatus(204);
    } catch(e) {
        next(e);
    }

    return undefined;
}

export async function remove(req: Request, res: Response, next: (...args: any[]) => any) {

}

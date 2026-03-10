import type { Request, Response } from "express";
import * as taskRepo from "./taskRepo.js";

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
    
}

export async function remove(req: Request, res: Response, next: (...args: any[]) => any) {

}

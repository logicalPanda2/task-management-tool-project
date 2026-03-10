import type { Request, Response } from "express"
import * as projectRepo from "./projectRepo.js";
import { getFullProjectData } from "./projectService.js";

export async function getAll(req: Request, res: Response, next: (...args: any[]) => any) {
    try {
        const user = req.user;
        if(!user) return res.sendStatus(401);

        const projects: ProjectMetadata[] = await projectRepo.getAllByUserId(user.id);

        res.json({ projects: projects });
    } catch(e) {
        next(e);
    }

    return undefined;
}

export async function getById(req: Request, res: Response, next: (...args: any[]) => any) {
    try {
        if(
            !("projectId" in req.params) ||
            typeof req.params.projectId !== "string"
        ) return res.send(400);

        const id = req.params.projectId;

        const project = await getFullProjectData(id);

        return res.json({
            project: project
        });
    } catch(e) {
        next(e);
    }

    return undefined;
}

export function createAndUpdate(project: Project) {
    // if get project.id exists then update
    // else create new
}

export function deleteById() {
    // call model without abstractions
}

export function invite() {
    // call model without abstractions
}

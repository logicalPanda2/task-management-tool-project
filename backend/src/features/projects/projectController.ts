import type { Request, Response } from "express"
import * as ProjectRepo from "./projectRepo.js";

export async function getAllProjects(req: Request, res: Response, next: (...args: any[]) => any) {
    try {
        const user = req.user;
        if(!user) return res.sendStatus(401);

        const projects: ProjectMetadata[] = await ProjectRepo.getAllByUserId(user.id);

        res.json({ projects: projects });
    } catch(e) {
        next(e);
    }

    return undefined;
}

export async function getProject(req: Request, res: Response, next: (...args: any[]) => any) {
    try {
        if(
            !("projectId" in req.params) ||
            typeof req.params.projectId !== "string"
        ) return res.send(400);

        const id = req.params.projectId;

        const project: ProjectMetadata = await ProjectRepo.getById(id);

        return project;
    } catch(e) {
        next(e);
    }

    return undefined;
}

export function createProject() {

}

export function deleteProject() {

}

export function addUserToProject() {

}

import type { Request, Response } from "express";
import { getAllProjectMetadataByUserId } from "./projectModel.js";

export async function getAllProjects(req: Request, res: Response, next: (...args: any[]) => any) {
    try {
        const user = req.user;
        if(!user) return res.sendStatus(401);

        const projects: ProjectMetadata[] = await getAllProjectMetadataByUserId(user.id);

        res.json({ projects: projects });
    } catch(e) {
        next(e);
    }

    return undefined;
}

export function getProject() {

}

export function createProject() {

}

export function deleteProject() {

}

export function addUserToProject() {

}

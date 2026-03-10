import type { Request, Response } from "express";
import * as commentRepo from "./commentRepo.js";
import * as Services from "./commentService.js";

export async function getAll(req: Request, res: Response, next: (...args: any[]) => any) {
    try {
        if(
            !("projectId" in req.params) ||
            typeof req.params.projectId !== "string"
        ) return res.sendStatus(400);

        const projectId = req.params.projectId;
        const comments = await commentRepo.getAllByProjectId(projectId);

        return res.json({
            comments: comments
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

        // service call here

        return res.sendStatus(204);
    } catch(e) {
        next(e);
    }

    return undefined;
}

export async function remove(req: Request, res: Response, next: (...args: any[]) => any) {
    try {
        if(
            !("commentId" in req.params) ||
            typeof req.params.commentId !== "string"
        ) return res.sendStatus(400);

        const id = req.params.commentId;

        await commentRepo.deleteById(id);

        return res.sendStatus(204);
    } catch(e) {
        next(e);
    }

    return undefined;
}

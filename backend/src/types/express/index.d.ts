import type { User } from "../user.ts";
import type { Express } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: User,
        }
    }
}

export {};

import type { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken, verifyUserCredentials } from "./authService.js";

export async function login(req: Request, res: Response, next: (...args: any[]) => any) {
    try {
        const { email, password } = req.body;

        const user = await verifyUserCredentials(email, password);

        if(!user) return res.status(401);

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie( "refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });

        res.json({ accessToken });
    } catch(e) {
        next(e);
    }
    
    return undefined;
}

export function refresh(req: Request, res: Response, next: (...args: any[]) => any) {
    res.json({
        message: "New access token granted"
    });
}

export function logout(req: Request, res: Response, next: (...args: any[]) => any) {
    res.json({
        message: "Credentials removed"
    });
}

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET!;
import "../types";
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: "Unauthorized: No token" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string, role: string };
        req.user = {
            id: decoded.id,
            role: decoded.role as 'user' | 'admin',
        };
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' }); return;
    }
}
import "../types/index";
import { Request, Response, NextFunction } from "express";
export const requireRole = (role: 'user' | 'admin') => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!role) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        if (req.user!.role !== role) {
            res.status(403).json({ message: "Forbidden: Insufficient role" });
            return;
        }
        next();
    };
};
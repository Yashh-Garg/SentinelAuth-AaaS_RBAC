import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET!;
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validated = registerSchema.parse(req.body);
        const isUser = await User.findOne({ email: validated.email });
        if (isUser) { res.status(400).json({ message: 'User already exists' }); }
        const hashedPassword = await bcrypt.hash(validated.password, 10);
        const user = await User.create({ ...validated, password: hashedPassword });
        res.status(201).json({
            message: 'User registered successful', user: { email: user.email, role: user.role }
        });
    } catch (err) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validated = loginSchema.parse(req.body);
        const isUser = await User.findOne({ email: validated.email });
        if (!isUser) { res.status(400).json({ message: `User doesn't exists` }); return; }
        const credentials = await bcrypt.compare(validated.password, isUser.password);
        if (!credentials) { res.status(400).json({ message: `Invalid Credential` }); return; }
        const token = jwt.sign({ id: isUser.id, role: isUser.role }, JWT_SECRET);
        res.status(200).json({ message: `Login successful`, token: token });
    }
    catch (err) {
        next(err);
    }
};

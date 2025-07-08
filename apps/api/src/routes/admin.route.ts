import express from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/requireRole.middleware";
const router = express.Router();
router.get('/dashboard', requireAuth, requireRole("admin"), (req, res) => {
    res.json({ message: 'Welcome to the admin dashboard!' });
})
export default router;
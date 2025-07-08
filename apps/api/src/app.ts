import { errorHandler } from './middlewares/errorHandler';
import express from "express";
import authRoute from "./routes/auth.routes"
import userRoute from "./routes/user.route"
import cors from "cors"
import adminRoute from "./routes/admin.route"
const app = express();
app.use(cors())
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/admin', adminRoute);
app.use(errorHandler);
export default app;



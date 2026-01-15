import { Router } from "express";
import pollutionRoutes from "./pollution.routes.js";
import userRoutes from "./user.routes.js";
const router = Router();
// Routes principales
router.use("/pollutions", pollutionRoutes);
router.use("/users", userRoutes);
export default router;

import { Router } from "express";
import ImageRouter from "./Images";
import DocumentRouter from "./Documents";

// Init router and path
const router = Router();

// Add sub-routes
router.use("/images", ImageRouter);
router.use("/documents", DocumentRouter);

// Export the base-router
export default router;

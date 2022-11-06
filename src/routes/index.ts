import { Router } from "express";
import FileRouter from "./FileRouter";
import QrRouter from "./QrRouter";

const router: Router = Router();

router.use("/file", FileRouter);
router.use("/api", QrRouter);

export default router;

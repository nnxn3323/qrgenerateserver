import { Router } from "express";
import { generateQr } from "../controllers/QrController";

const router: Router = Router();

router.post("/qr", generateQr);

export default router;

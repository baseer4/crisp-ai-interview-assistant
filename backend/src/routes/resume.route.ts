import express from "express";
import multer from "multer";
import { parseResumeController } from "../controllers/resume.contoller";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/parse", upload.single("file"), parseResumeController);

export default router;

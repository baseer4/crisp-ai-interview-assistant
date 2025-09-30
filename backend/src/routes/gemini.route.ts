import express from "express";
import { geminiController } from "../controllers/gemini.controller";

const router = express.Router();

router.post("/generate", geminiController);

export default router;
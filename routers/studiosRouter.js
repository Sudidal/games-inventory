import express from "express";
import studiosController from "../controllers/studiosController.js";

const router = express.Router();

router.get("/", studiosController.studiosGet);

export { router as studiosRouter };

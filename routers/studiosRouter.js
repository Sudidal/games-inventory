import express from "express";
import studiosController from "../controllers/studiosController";

const router = express.Router();

router.get("/", studiosController.studiosGet);

export { router as studiosRouter };

import express from "express";
import gamesController from "../controllers/gamesController.js";

const router = express.Router();

router.get("/", gamesController.gamesGet);

export { router as gamesRouter };

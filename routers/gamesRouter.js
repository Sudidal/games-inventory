import express from "express";
import gamesController from "../controllers/gamesController.js";

const router = express.Router();

router.get("/", gamesController.gamesAllGet);
router.get("/info/:gameId", gamesController.gamesSingleGet);
router.get("/add", gamesController.gamesAddGet);
router.get("/edit/:gameId", gamesController.gamesEditGet);
router.get("/delete/:gameId", gamesController.gamesDeleteGet);
router.post("/add", gamesController.gamesAddPost);
router.post("/edit/:gameId", gamesController.gamesEditPost);

export { router as gamesRouter };

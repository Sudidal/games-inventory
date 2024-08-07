import express from "express";
import gamesController from "../controllers/gamesController.js";

const router = express.Router();

router.get("/", gamesController.gamesGet);
router.get("/add", gamesController.gamesAddGet);
router.get("/edit:gameId", gamesController.gamesEditGet);
router.post("/add", gamesController.gamesAddPost);
router.post("/edit:gameId", gamesController.gamesEditPost);
router.post("/delete:gameId", gamesController.gamesDeletePost);

export { router as gamesRouter };

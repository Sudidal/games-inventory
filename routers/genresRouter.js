import express from "express";
import genresController from "../controllers/genresController.js";

const router = express.Router();

router.get("/", genresController.genresAllGet);
router.get("/info/:genreId", genresController.genresSingleGet);
router.get("/add", genresController.genresAddGet);
router.get("/delete/:genreId", genresController.genresDeleteGet);
router.post("/add", genresController.genresAddPost);

export { router as genresRouter };

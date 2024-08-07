import express from "express";
import genresController from "../controllers/genresController.js";

const router = express.Router();

router.get("/", genresController.genresGet);
router.get("/add", genresController.genresAddGet);
router.post("/add", genresController.genresAddPost);
router.post("/delete:genreId", genresController.genresDeletePost);

export { router as genresRouter };

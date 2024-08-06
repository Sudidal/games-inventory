import express from "express";
import genresController from "../controllers/genresController.js";

const router = express.Router();

router.get("/", genresController.genresGet);

export { router as genresRouter };

import express from "express";
import genresController from "../controllers/genresController";

const router = express.Router();

router.get("/", genresController.genresGet);

export { router as genresRouter };

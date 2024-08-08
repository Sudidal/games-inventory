import express from "express";
import studiosController from "../controllers/studiosController.js";

const router = express.Router();

router.get("/", studiosController.studiosGet);
router.get("/add", studiosController.studiosAddGet);
router.get("/delete/:studioId", studiosController.studiosDeleteGet);
router.post("/add", studiosController.studiosAddPost);

export { router as studiosRouter };

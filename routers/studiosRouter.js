import express from "express";
import studiosController from "../controllers/studiosController.js";

const router = express.Router();

router.get("/", studiosController.studiosGet);
router.get("/add", studiosController.studiosAddGet);
router.post("/add", studiosController.studiosAddPost);
router.post("/delete:id", studiosController.studiosDeletePost);

export { router as studiosRouter };

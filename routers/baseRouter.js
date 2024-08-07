import express from "express";
import { homeRouter } from "./homeRounter.js";
import { studiosRouter } from "./studiosRouter.js";
import { gamesRouter } from "./gamesRouter.js";
import { genresRouter } from "./genresRouter.js";

const router = express.Router();

router.all("/", (req, res) => {
  res.redirect("/home");
});
router.use("/home", homeRouter);
router.use("/games", gamesRouter);
router.use("/studios", studiosRouter);
router.use("/genres", genresRouter);

export { router as baseRouter };

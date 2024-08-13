import express from "express";
import { notFoundRouter } from "./notFoundRouter.js";
import { internalErrorRouter } from "./internalErrorRouter.js";
import { homeRouter } from "./homeRounter.js";
import { studiosRouter } from "./studiosRouter.js";
import { gamesRouter } from "./gamesRouter.js";
import { genresRouter } from "./genresRouter.js";
import { getFileRouter } from "./getFileRoute.js";

const router = express.Router();

router.all("/", (req, res) => {
  res.redirect("/home");
});
router.use("/home", homeRouter);
router.use("/games", gamesRouter);
router.use("/studios", studiosRouter);
router.use("/genres", genresRouter);
router.use("/getFile", getFileRouter);
router.all("*", notFoundRouter);
router.use(internalErrorRouter);

export { router as baseRouter };

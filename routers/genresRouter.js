import express from "express";
import queries from "../db/queries.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await queries.getAllGenres();
    console.log(data);
    res.send(data[0].genre_name);
  } catch (err) {
    console.log(err);
  }
});

export { router as genresRouter };

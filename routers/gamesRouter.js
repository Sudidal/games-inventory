import express from "express";
import queries from "../db/queries.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await queries.getAllGames();
    console.log(data);
    res.send(data[0].title);
  } catch (err) {
    console.log(err);
  }
});

export { router as gamesRouter };

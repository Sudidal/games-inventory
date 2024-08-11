import express from "express";
import fs from "fs/promises";
import views from "../views/views.js";
import ejs from "ejs";

const router = express.Router();

router.get("/genreBullet", async (req, res) => {
  try {
    // const data = await fs.readFile(views.genreBullet + ".ejs", {
    //   encoding: "utf-8",
    // });
    ejs.renderFile(
      views.genreBullet + ".ejs",
      {
        genre: { genre_name: "", genre_id: "" },
      },
      (err, html) => {
        console.log(html);
        res.send(html);
      }
    );
  } catch (err) {
    console.error(err);
  }
});

export { router as getFileRouter };

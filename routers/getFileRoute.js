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
        genreName: "",
      },
      (err, html) => {
        if (err) {
          console.log(err);
        }
        console.log(html);
        res.send(html);
      }
    );
  } catch (err) {
    console.error(err);
  }
});

export { router as getFileRouter };

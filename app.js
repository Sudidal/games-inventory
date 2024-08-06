import express from "express";
import { config } from "dotenv";
import process from "node:process";
import { homeRouter } from "./routers/homeRounter.js";
import { studiosRouter } from "./routers/studiosRouter.js";
import { gamesRouter } from "./routers/gamesRouter.js";
import { genresRouter } from "./routers/genresRouter.js";

config();
const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.all("/", (req, res) => {
  res.redirect("/home");
});
app.use("/home", homeRouter);
app.use("/games", gamesRouter);
app.use("/studios", studiosRouter);
app.use("/genres", genresRouter);

app.listen(PORT, () => console.log("Server running at port: " + PORT));

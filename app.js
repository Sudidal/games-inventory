import express from "express";
import { config } from "dotenv";
import process from "node:process";
import { baseRouter } from "./routers/baseRouter.js";
import path from "node:path";

config();

const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use("/", baseRouter);

app.listen(PORT, () =>
  console.log(
    "Server running at port: " + PORT + " \x1b[36m%s\x1b[0m",
    "http://localhost:" + PORT
  )
);

import express from "express";
import { config } from "dotenv";
import process from "node:process";
import { baseRouter } from "./routers/baseRouter.js";
import views from "./views/views.js";

config();
const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.locals.views = views;
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use("/", baseRouter);

app.listen(PORT, () =>
  console.log(
    "Server running at port: " + PORT + " \x1b[36m%s\x1b[0m",
    "http://localhost:" + PORT
  )
);

// console.log("__dirname: " + __dirname); // only commonJs
// console.log("import.meta.dirname: " + import.meta.dirname);  // good, not supported well
// console.log("path.dirname(): " + path.dirname("./views/views.js")); // works, not what i want
// console.log("process.cwd(): " + process.cwd()); //good, supported, maybe not stable

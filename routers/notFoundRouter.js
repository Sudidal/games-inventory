import express from "express";
import views from "../views/views.js";

const router = express.Router();

router.all("*", (req, res) => {
  res
    .status(404)
    .render(views.index, { page: views.notFoundError, params: {} });
});

export { router as notFoundRouter };

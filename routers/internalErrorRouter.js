import express from "express";
import views from "../views/views.js";

const router = (err, req, res, next) => {
  console.error(err);
  res
    .status(500)
    .render(views.index, { page: views.internalError, params: {} });
};

export { router as internalErrorRouter };

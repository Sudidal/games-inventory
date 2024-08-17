import queries from "../db/queries.js";
import views from "../views/views.js";
import { body, validationResult, matchedData } from "express-validator";
import validators from "../validators.js";
import homeController from "./homeController.js";

class StudiosController {
  constructor() {}

  async studiosAllGet(req, res, next) {
    const data = await queries.getAllStudios();
    console.log(data);
    if (!data) {
      return next(new Error("ERROR RETRIEVING DATA"));
    }
    res.render(views.index, {
      page: views.studiosList,
      params: { studios: data, heading: "All Studios" },
    });
  }
  studiosSingleGet = [
    async (req, res, next) => {
      const studioData = await queries.getStudio(req.params.studioId);
      const gamesData = await queries.getGamesByStudio(req.params.studioId);
      console.log(studioData);
      console.log(gamesData);
      if (!studioData || !gamesData) {
        return next(new Error("ERROR RETRIEVING DATA"));
      } else if (studioData.length <= 0) {
        req.errors = [{ msg: "Couldn't find studio" }];
        return next();
      }
      res.render(views.index, {
        page: views.studio,
        params: { studio: studioData[0], games: gamesData },
      });
      next();
    },
    homeController.homeGet,
  ];
  async studiosAddGet(req, res) {
    res.render(views.index, { page: views.studiosForm, params: {} });
  }
  studiosAddPost = [
    validate,
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).render(views.index, {
          page: views.studiosForm,
          errors: errors.array(),
          params: {},
        });
      }
      const studioInfo = matchedData(req);
      console.log(studioInfo);
      const result = await queries.insertStudio(studioInfo);
      if (result) {
        req.successes = [{ msg: "Studio added successfully" }];
      } else {
        req.errors = [{ msg: "Couldn't add studio" }];
      }
      next();
    },
    homeController.homeGet,
  ];

  studiosDeleteGet = [
    async (req, res, next) => {
      const result = await queries.deleteStudio(req.params.studioId);
      if (result) {
        req.successes = [{ msg: "studio deleted successfully" }];
      } else {
        req.errors = [{ msg: "Error, couldn't delete studio" }];
      }
      next();
    },
    homeController.homeGet,
  ];
}

const validate = [
  body("studioName", "Studio name must be between 1 and 30 characters")
    .trim()
    .isString()
    .isLength({ min: 1, max: 30 })
    .bail()
    .custom(validators.isStudioNotExist),
  body(
    "logoUrl",
    "Logo URL must be a working image URL with format (png/jpg/jpeg/svg/webp)"
  )
    .trim()
    .isURL()
    .custom(validators.isLinkToImage),
];

const studiosController = new StudiosController();
export default studiosController;

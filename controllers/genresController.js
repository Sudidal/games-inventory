import queries from "../db/queries.js";
import views from "../views/views.js";
import { body, validationResult, matchedData } from "express-validator";
import validators from "../validators.js";
import homeController from "./homeController.js";

class GenresController {
  constructor() {}

  async genresAllGet(req, res, next) {
    const data = await queries.getAllGenres();
    console.log(data);
    if (!data) {
      return next(new Error("COULDN'T RETRIEVE DATA"));
    }
    res.render(views.index, {
      page: views.genresList,
      params: { genres: data, heading: "All Genres" },
    });
  }
  genresSingleGet = [
    async (req, res, next) => {
      const genreData = await queries.getGenre(req.params.genreId);
      const gamesData = await queries.getGamesByGenre(genreData[0]?.genre_name);
      console.log(genreData);
      console.log(gamesData);
      if (!genreData) {
        return next(new Error("COULDN'T RETRIEVE DATA"));
      } else if (genreData.length <= 0) {
        req.errors = [{ msg: "Couldn't find genre" }];
        return next();
      }
      res.render(views.index, {
        page: views.genre,
        params: { genre: genreData[0], games: gamesData },
      });
    },
    homeController.homeGet,
  ];
  async genresAddGet(req, res) {
    res.render(views.index, { page: views.genresForm, params: {} });
  }
  genresAddPost = [
    body("genreName", "Genre name must be between 1 and 20 characters")
      .trim()
      .isString()
      .bail()
      .isLength({ min: 1, max: 20 })
      .bail()
      .custom(validators.isGenreNotExist)
      .bail(),
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).render(views.index, {
          page: views.genresForm,
          errors: errors.array(),
          params: {},
        });
      }
      const genreInfo = matchedData(req);
      console.log(genreInfo);
      const result = await queries.insertGenre(genreInfo.genreName);
      if (result) {
        req.successes = [{ msg: "Genre added seccessfully" }];
      } else {
        req.errors = [{ msg: "Error, couldn't add genre" }];
      }
      next();
    },
    homeController.homeGet,
  ];
  genresDeleteGet = [
    async (req, res, next) => {
      const result = await queries.deleteGenre(req.params.genreId);
      if (result) {
        req.successes = [{ msg: "Genre deleted seccessfully" }];
      } else {
        req.errors = [{ msg: "Error, couldn't delete genre" }];
      }
      next();
    },
    homeController.homeGet,
  ];
}

const genresController = new GenresController();
export default genresController;

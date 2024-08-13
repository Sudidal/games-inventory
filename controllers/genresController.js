import queries from "../db/queries.js";
import views from "../views/views.js";
import { body, validationResult, matchedData } from "express-validator";

class GenresController {
  constructor() {}

  async genresAllGet(req, res) {
    const data = await queries.getAllGenres();
    console.log(data);
    if (!data) {
      res.send("COULDN'T RETRIEVE DATA");
    } else if (data.length <= 0) {
      res.send("No genres to show here, Why not add one?");
    }
    res.render(views.index, {
      page: views.genresList,
      params: { genres: data },
    });
  }
  async genresSingleGet(req, res) {
    const genreData = await queries.getGenre(req.params.genreId);
    const gamesData = await queries.getGamesByGenre(genreData[0]?.genre_name);
    console.log(genreData);
    console.log(gamesData);
    if (!genreData) {
      res.send("COULDN'T RETRIEVE DATA");
    } else if (genreData.length <= 0) {
      res.send("No genres to show here, Why not add one?");
    }
    res.render(views.index, {
      page: views.genre,
      params: { genre: genreData[0], games: gamesData },
    });
  }
  async genresAddGet(req, res) {
    res.render(views.index, { page: views.genresForm, params: {} });
  }
  genresAddPost = [
    body("genreName", "Genre name must be between 1 and 20 characters")
      .trim()
      .isString()
      .isLength({ min: 1, max: 20 }),
    async (req, res) => {
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
        res.send("Genre added seccessfully");
      } else {
        res.send("Error, couldn't add genre");
      }
    },
  ];

  async genresDeleteGet(req, res) {
    const result = await queries.deleteGenre(req.params.genreId);
    if (result) {
      res.send("Genre deleted seccessfully");
    } else {
      res.send("Error, couldn't delete genre");
    }
  }
}

const genresController = new GenresController();
export default genresController;

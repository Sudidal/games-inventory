import queries from "../db/queries.js";
import views from "../views/views.js";
import { body, matchedData, validationResult } from "express-validator";
import validators from "../validators.js";

class GamesController {
  constructor() {}

  async gamesAllGet(req, res) {
    const data = await queries.getAllGames();
    console.log(data);
    if (!data) {
      res.send("ERROR RETRIEVING DATA");
    }
    res.render(views.index, {
      page: views.gamesList,
      params: { games: data, heading: "All Games" },
    });
  }
  async gamesSingleGet(req, res) {
    const data = await queries.getGame(req.params.gameId);
    console.log(data);
    if (!data) {
      return res.send("ERROR RETRIEVING DATA");
    } else if (data.length <= 0) {
      return res.send("No game to show here, Why not add one?");
    }
    res.render(views.index, {
      page: views.game,
      params: { game: data[0] },
    });
  }
  async gamesAddGet(req, res) {
    const data = await getFormParams();
    if (!data) {
      return res.render("ERROR RETRIEVING DATA");
    }
    res.render(views.index, {
      page: views.gamesForm,
      params: {
        action: "/games/add",
        studios: data.studiosData,
        genres: data.genresData,
      },
    });
  }
  gamesAddPost = [
    validateGameInput,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array());
        const data = await getFormParams();
        if (!data) return res.render("ERROR RETRIEVING DATA");
        return res.status(400).render(views.index, {
          page: views.gamesForm,
          errors: errors.array(),
          params: {
            studios: data.studiosData,
            genres: data.genresData,
          },
        });
      }
      const gameInfo = matchedData(req);
      const result = await queries.insertGame(gameInfo);
      if (result) {
        res.send("Game added successfully");
      } else {
        res.send("Error, couldn't add game");
      }
    },
  ];

  async gamesEditGet(req, res) {
    const data = await getFormParams();
    if (!data) {
      return res.render("ERROR RETRIEVING DATA");
    }
    const gameInfo = await queries.getGame(req.params.gameId);
    console.log(gameInfo);
    if (!gameInfo || gameInfo.length <= 0) {
      return res.send("Error, couldn't find game");
    }
    res.render(views.index, {
      page: views.gamesForm,
      params: {
        action: `/games/edit/${gameInfo[0].game_id}`,
        game: gameInfo[0],
        genres: data.genresData,
        studios: data.studiosData,
      },
    });
  }
  gamesEditPost = [
    validateGameInput,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array());
        const data = await getFormParams();
        if (!data) return res.render("ERROR RETRIEVING DATA");
        return res.status(400).render(views.index, {
          page: views.gamesForm,
          errors: errors.array(),
          params: {
            studios: data.studiosData,
            genres: data.genresData,
          },
        });
      }
      const gameInfo = matchedData(req);
      const result = await queries.updateGame(req.params.gameId, gameInfo);
      if (result) {
        res.send("Game updated successfully");
      } else {
        res.send("Error, couldn't update game");
      }
    },
  ];
  async gamesDeleteGet(req, res) {
    const result = await queries.deleteGame(req.params.gameId);
    if (result) {
      res.send("Game deleted successfully");
    } else {
      res.send("Error, couldn't delete game");
    }
  }
}

async function getFormParams() {
  try {
    const studiosData = await queries.getAllStudios();
    const genresData = await queries.getAllGenres();
    return { studiosData, genresData };
  } catch {
    return false;
  }
}

const validateGameInput = [
  body("title", "Title must be between 1 and 60 characters")
    .trim()
    .isString()
    .isLength({ min: 1, max: 60 }),
  body("rating", "Rating must be a number between 0 and 5")
    .trim()
    .isNumeric()
    .custom(validators.isNumberBetween),
  body(
    "logoUrl",
    "Logo URL must be a working image URL with format (png/jpg/jpeg/svg)"
  )
    .trim()
    .isURL()
    .custom(validators.isLinkToImage),
  body(
    "bannerUrl",
    "Banner URL must be a working image URL with format (png/jpg/jpeg/svg)"
  )
    .trim()
    .isURL()
    .custom(validators.isLinkToImage),
  body("releaseDate", "Release date must be a valid date").trim().isDate(),
  body("studioId", "Please enter a valid studio").trim().isNumeric(),
  body("genre", "Please enter valid genres").trim().isString().notEmpty(),
];

const gamesController = new GamesController();
export default gamesController;

// EXPRESS VALIDATOR IS EASY:
//
// It has one main goal, validate/sanitize/modify the request
// either by the req's body or query
//
// to use it we just call body()/query() from the library and insert
// in the name of the field we want to validate
//
// body()/query() can reach req's variables without referencing it
// so we can use body()/query() in other functions without needing to
// pass (req, res) parameters, so it is different from a middleware
//
// We can also reuse the validation chains on multiple fields
// by appling them in a function (e.g. createNameChain =
//  () => body('name').escape())
// validation chains are mutable so we can't store them in a variable
// and use them, instead we give them a function that creates new instances
// each time
//
// if we want to apply a validation chain to every field in the req
// we can use the wildcard (e.g. body("*").escape()) or the
// globstar(**) the extends wildcard and reaches nested obj (e.g
// body("**".escape))
//
// that's for the validation, once done we can access the validation
// results through the validationResult(req) method, that can
// give the results based on the req
// e.g. const result = validationResult(req);
// and we check if there were any errors, and send it to the user:
// e.g. if(!results.isEmpty()) {
//         res.send(results.array())
//      }
//
// ACTUALLY CHAINS ARE ONLY REUSABLE IN DIFFERENT PLACES BECAUSE
// WE STILL NEED TO PROVIDE THE INPUT NAME, BUT WE CAN STILL USE IT THE WAY WE WANT
// , HAHAHAHAHA
//
// When we use a custom validator and that validator is async
// return false won't make the validation fail
// instead we need to either return the used promise and let
// the library catch the error, or catch the error ourselves
// and throw instead of return false

import queries from "../db/queries.js";
import views from "../views/views.js";
import { body, matchedData, validationResult } from "express-validator";
import validators from "../validators.js";
import homeController from "./homeController.js";
import userAuth from "../userAuth.js";

class GamesController {
  constructor() {}

  async gamesAllGet(req, res, next) {
    const data = await queries.getAllGames();
    console.log(data);
    if (!data) {
      return next(new Error("ERROR RETRIEVING DATA"));
    }
    res.render(views.index, {
      page: views.gamesList,
      params: { games: data, heading: "All Games" },
    });
  }
  gamesSingleGet = [
    async (req, res, next) => {
      const data = await queries.getGame(req.params.gameId);
      console.log(data);
      if (!data) {
        return next(new Error("ERROR RETRIEVING DATA"));
      } else if (data.length <= 0) {
        req.errors = [{ msg: "Couldn't find game" }];
        return next();
      }
      res.render(views.index, {
        page: views.game,
        params: { game: data[0] },
      });
    },
    homeController.homeGet,
  ];
  async gamesAddGet(req, res, next) {
    const data = await getFormParams();
    if (!data) {
      return next(new Error("ERROR RETRIEVING DATA"));
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
    body("title").custom(validators.isGameNotExist),
    validateGameInput,
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array());
        const data = await getFormParams();
        if (!data) return next(new Error("ERROR RETRIEVING DATA"));
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
        req.successes = [{ msg: "Game added successfully" }];
      } else {
        req.errors = [{ msg: "Couldn't add game" }];
      }
      next();
    },
    homeController.homeGet,
  ];
  gamesEditGet = [
    async (req, res, next) => {
      const data = await getFormParams();
      if (!data) {
        return next(new Error("ERROR RETRIEVING DATA"));
      }
      const gameInfo = await queries.getGame(req.params.gameId);
      console.log(gameInfo);
      if (!gameInfo || gameInfo.length <= 0) {
        console.log("alhamdulillah");
        req.errors = [{ msg: "Couldn't find game" }];
        return next();
      }
      res.render(views.index, {
        page: views.gamesForm,
        params: {
          action: req.originalUrl,
          game: gameInfo[0],
          genres: data.genresData,
          studios: data.studiosData,
        },
      });
    },
    homeController.homeGet,
  ];
  gamesEditPost = [
    validateGameInput,
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array());
        const data = await getFormParams();
        if (!data) return next(new Error("ERROR RETRIEVING DATA"));
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
      const havePermission = await canOperateOnGame(
        req,
        req.params.gameId,
        next
      );
      if (!havePermission) {
        req.errors = [{ msg: userAuth.permissionErrorMessage() }];
        return next();
      }
      const result = await queries.updateGame(req.params.gameId, gameInfo);
      if (result) {
        req.successes = [{ msg: "Game updated successfully" }];
      } else {
        req.errors = [{ msg: "Error, couldn't update game" }];
      }
      next();
    },
    homeController.homeGet,
  ];
  gamesDeleteGet = [
    async (req, res, next) => {
      const havePermission = await canOperateOnGame(
        req,
        req.params.gameId,
        next
      );
      if (!havePermission) {
        req.errors = [{ msg: userAuth.permissionErrorMessage() }];
        return next();
      }
      const result = await queries.deleteGame(req.params.gameId);
      if (result) {
        req.successes = [{ msg: "Game deleted successfully" }];
      } else {
        res.errors = [{ msg: "Error, couldn't delete game" }];
      }
      next();
    },
    homeController.homeGet,
  ];
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
    .isLength({ min: 1, max: 60 })
    .bail(),
  body("rating", "Rating must be a number between 0 and 5")
    .trim()
    .isNumeric()
    .custom(validators.isNumberBetween),
  body(
    "logoUrl",
    "Logo URL must be a working image URL with format (png/jpg/jpeg/svg/webp)"
  )
    .trim()
    .isURL()
    .bail()
    .custom(validators.isLinkToImage),
  body(
    "bannerUrl",
    "Banner URL must be a working image URL with format (png/jpg/jpeg/svg/webp)"
  )
    .trim()
    .isURL()
    .bail()
    .custom(validators.isLinkToImage),
  body("releaseDate", "Release date must be a valid date").trim().isDate(),
  body("studioId", "Please enter a valid studio").trim().isNumeric(),
  body("genre", "Please enter valid genres").trim().isString().notEmpty(),
];

async function canOperateOnGame(req, gameId, next) {
  console.log(req.query);
  const game = await queries.getGame(gameId);
  console.log(game);
  if (!game || game.length <= 0) {
    return next(new Error("Couldn't find game"));
  }
  if (game[0].admin) {
    if (userAuth.isAdmin(req)) return true;
    else return false;
  } else {
    return true;
  }
}

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

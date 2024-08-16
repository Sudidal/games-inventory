import queries from "../db/queries.js";
import views from "../views/views.js";

class HomeController {
  constructor() {}

  async homeGet(req, res, next) {
    const topGamesData = await queries.getTopGames(10);
    const topGenresData = await queries.getTopGenres(10);
    const topStudiosData = await queries.getTopStudios(10);
    console.log(topGamesData);
    console.log(topGenresData);
    console.log(topStudiosData);
    if (!topGamesData || !topGenresData || !topStudiosData) {
      return next(new Error("ERROR RETRIEVING DATA"));
    }
    res.render(views.index, {
      page: views.home,
      successes: req.successes,
      errors: req.errors,
      params: {
        games: topGamesData,
        genres: topGenresData,
        studios: topStudiosData,
      },
    });
  }
  // let's keep for testing
  async fail(req, res, next) {
    next(new Error("oh, i failed"));
  }
}

const homeController = new HomeController();
export default homeController;

// If a Sync code throws, express will catch it without the need
// to call next(), if Async code throws, then we will need to call next()

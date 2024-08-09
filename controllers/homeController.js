import queries from "../db/queries.js";
import views from "../views/views.js";

class HomeController {
  constructor() {}

  async homeGet(req, res) {
    const topGamesData = await queries.getTopGames(10);
    const topGenresData = await queries.getTopGenres(10);
    const topStudiosData = await queries.getTopStudios(10);
    console.log(topGamesData);
    console.log(topGenresData);
    console.log(topStudiosData);
    res.render(views.index, {
      page: views.home,
      params: {
        games: topGamesData,
        genres: topGenresData,
        studios: topStudiosData,
      },
    });
  }
}

const homeController = new HomeController();
export default homeController;

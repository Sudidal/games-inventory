import queries from "../db/queries.js";

class HomeController {
  constructor() {}

  async homeGet(req, res) {
    const topGamesData = await queries.getTopGames(10);
    const topGenresData = await queries.getTopGenres(10);
    const topStudiosData = await queries.getTopStudios(10);
    console.log(topGamesData);
    console.log(topGenresData);
    console.log(topStudiosData);
    res.render("index", {
      page: "home/home",
      params: {
        topGames: topGamesData,
        topGenres: topGenresData,
        topStudios: topStudiosData,
      },
    });
  }
}

const homeController = new HomeController();
export default homeController;

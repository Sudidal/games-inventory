import queries from "../db/queries.js";

class GamesController {
  constructor() {}

  async gamesGet(req, res) {
    const data = await queries.getAllGames();
    console.log(data);
    if (!data) {
      res.send("ERROR RETRIEVING DATA");
    } else if (data.length <= 0) {
      res.send("No games to show here, Why not add one?");
    }
    res.render("index", { page: "games/games", params: { games: data } });
  }
  async gamesAddGet(req, res) {
    res.render("index", {
      page: "games/form",
      params: { action: "/games/add" },
    });
  }
  async gamesAddPost(req, res) {
    const gameInfo = {
      title: req.body.title,
      rating: req.body.rating,
      genre: req.body.genre,
      releaseDate: req.body.releaseDate,
      logoUrl: req.body.logoUrl,
      bannerUrl: req.body.bannerUrl,
      studioId: req.body.studioId,
    };

    const result = await queries.insertGame(gameInfo);
    if (result) {
      res.send("Game added successfully");
    } else {
      res.send("Error, couldn't add game");
    }
  }
  async gamesEditGet(req, res) {
    const data = await queries.getGame(req.params.gameId);
    console.log(data);
    if (!data || data.length <= 0) {
      res.send("Error, couldn't find game");
    }
    data.release_date = data.release_date;
    res.render("index", {
      page: "games/form",
      params: { action: `/games/edit/${data[0].game_id}`, game: data[0] },
    });
  }
  async gamesEditPost(req, res) {
    const gameInfo = {
      title: req.body.title,
      rating: req.body.rating,
      genre: req.body.genre,
      releaseDate: req.body.releaseDate,
      logoUrl: req.body.logoUrl,
      bannerUrl: req.body.bannerUrl,
      studioId: req.body.studioId,
    };

    const result = await queries.updateGame(req.params.gameId, gameInfo);
    if (result) {
      res.send("Game updated successfully");
    } else {
      res.send("Error, couldn't update game");
    }
  }
  async gamesDeleteGet(req, res) {
    const result = await queries.deleteGame(req.params.gameId);
    if (result) {
      res.send("Game deleted successfully");
    } else {
      res.send("Error, couldn't delete game");
    }
  }
}

const gamesController = new GamesController();
export default gamesController;

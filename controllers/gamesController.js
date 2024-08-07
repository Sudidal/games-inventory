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
    res.send(data[0].title);
  }
  async gamesAddGet(req, res) {
    //TODO: display form to add a game
  }
  async gamesAddPost(req, res) {
    const gameInfo = {
      name: req.body.title,
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
    // TODO: display edit game form
  }
  async gamesEditPost(req, res) {
    const gameInfo = {
      name: req.body.title,
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
  async gamesDeletePost(req, res) {
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

import queries from "../db/queries.js";

class GamesController {
  constructor() {}

  async gamesGet(req, res) {
    try {
      const data = await queries.getAllGames();
      console.log(data);
      res.send(data[0].title);
    } catch (err) {
      console.log(err);
    }
  }
}

const gamesController = new GamesController();
export default gamesController;

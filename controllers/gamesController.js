import queries from "../db/queries";

class GamesController {
  constructor() {}

  async gamesGet() {
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

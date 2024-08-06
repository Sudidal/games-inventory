import queries from "../db/queries.js";

class GenresController {
  constructor() {}

  async genresGet(req, res) {
    try {
      const data = await queries.getAllGenres();
      console.log(data);
      res.send(data[0].genre_name);
    } catch (err) {
      console.log(err);
    }
  }
}

const genresController = new GenresController();
export default genresController;
import queries from "../db/queries.js";

class GenresController {
  constructor() {}

  async genresGet(req, res) {
    const data = await queries.getAllGenres();
    console.log(data);
    if (!data) {
      res.send("COULDN'T RETRIEVE DATA");
    } else if (data.length <= 0) {
      res.send("No genres to show here, Why not add one?");
    }
    res.send(data[0].genre_name);
  }
  async genresAddGet(req, res) {
    // TODO: show add genre form
  }
  async genresAddPost(req, res) {
    const result = await queries.insertGenre(req.body.name);
    if (result) {
      res.send("Genre added seccessfully");
    } else {
      res.send("Error, couldn't add genre");
    }
  }
  async genresDeletePost(req, res) {
    const result = await queries.deleteGenre(req.params.genreId);
    if (result) {
      res.send("Genre deleted seccessfully");
    } else {
      res.send("Error, couldn't delete genre");
    }
  }
}

const genresController = new GenresController();
export default genresController;

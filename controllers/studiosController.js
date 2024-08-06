import queries from "../db/queries";

class StudiosController {
  constructor() {}

  async studiosGet() {
    try {
      const data = await queries.getAllGenres();
      console.log(data);
      res.send(data[0].genre_name);
    } catch (err) {
      console.log(err);
    }
  }
}

const studiosController = new StudiosController();
export default studiosController;

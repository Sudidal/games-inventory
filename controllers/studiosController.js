import queries from "../db/queries.js";

class StudiosController {
  constructor() {}

  async studiosGet(req, res) {
    try {
      const data = await queries.getAllStudios();
      console.log(data);
      res.send(data[0].studio_name);
    } catch (err) {
      console.log(err);
    }
  }
}

const studiosController = new StudiosController();
export default studiosController;

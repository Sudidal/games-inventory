import queries from "../db/queries";

class HomeController {
  constructor() {}

  async homeGet() {
    try {
      const data = await queries.getTopGames(10);
      console.log(data);
      res.send(data[0].title);
    } catch (err) {
      console.log(err);
    }
  }
}

const homeController = new HomeController();
export default homeController;

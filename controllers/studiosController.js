import queries from "../db/queries.js";

class StudiosController {
  constructor() {}

  async studiosGet(req, res) {
    const data = await queries.getAllStudios();
    console.log(data);
    if (!data) {
      res.send("ERROR RETRIEVING DATA");
    } else if (data.length <= 0) {
      res.send("No studios to show here, Why not add one?");
    }
    res.render("index", { page: "studios/studios", params: { studios: data } });
  }
  async studiosAddGet(req, res) {
    res.render("index", { page: "studios/form", params: {} });
  }
  async studiosAddPost(req, res) {
    const result = await queries.insertStudio(req.body.studioName);
    if (result) {
      res.send("studio added successfully");
    } else {
      res.send("Error, couldn't add studio");
    }
  }
  async studiosDeleteGet(req, res) {
    const result = await queries.deleteStudio(req.params.studioId);
    if (result) {
      res.send("studio deleted successfully");
    } else {
      res.send("Error, couldn't delete studio");
    }
  }
}

const studiosController = new StudiosController();
export default studiosController;

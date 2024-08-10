import queries from "../db/queries.js";
import views from "../views/views.js";

class StudiosController {
  constructor() {}

  async studiosAllGet(req, res) {
    const data = await queries.getAllStudios();
    console.log(data);
    if (!data) {
      res.send("ERROR RETRIEVING DATA");
    } else if (data.length <= 0) {
      res.send("No studios to show here, Why not add one?");
    }
    res.render(views.index, {
      page: views.studiosList,
      params: { studios: data },
    });
  }
  async studiosSingleGet(req, res) {
    const studioData = await queries.getStudio(req.params.studioId);
    const gamesData = await queries.getGamesByStudio(req.params.studioId);
    console.log(studioData);
    console.log(gamesData);
    if (!studioData || !gamesData) {
      return res.send("ERROR RETRIEVING DATA");
    } else if (studioData.length <= 0) {
      return res.send("No studios to show here, Why not add one?");
    }
    res.render(views.index, {
      page: views.studio,
      params: { studio: studioData[0], games: gamesData },
    });
  }
  async studiosAddGet(req, res) {
    res.render(views.index, { page: views.studiosForm, params: {} });
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

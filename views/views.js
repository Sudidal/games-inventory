import process from "node:process";

class Views {
  constructor() {}
  #rootPath = process.cwd();

  index = this.#rootPath + "/views/index";
  home = this.#rootPath + "/views/home/home";

  gamesList = this.#rootPath + "/views/games/gamesList";
  gamesForm = this.#rootPath + "/views/games/form";

  genresList = this.#rootPath + "/views/genres/genresList";
  genresForm = this.#rootPath + "/views/genres/form";

  studiosList = this.#rootPath + "/views/studios/studiosList";
  studiosForm = this.#rootPath + "/views/studios/form";
}

const views = new Views();
export default views;

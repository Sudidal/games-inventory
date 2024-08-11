import process from "node:process";

class Views {
  constructor() {}
  #rootPath = process.cwd();

  index = this.#rootPath + "/views/index";
  home = this.#rootPath + "/views/home/home";

  gamesList = this.#rootPath + "/views/games/gamesList";
  game = this.#rootPath + "/views/games/game";
  gamesForm = this.#rootPath + "/views/games/form";

  genresList = this.#rootPath + "/views/genres/genresList";
  genre = this.#rootPath + "/views/genres/genre";
  genreLinkCard = this.#rootPath + "/views/genres/genreLinkCard";
  genreToggleCard = this.#rootPath + "/views/genres/genreToggleCard";
  genreBullet = this.#rootPath + "/views/genres/genreBullet";
  genresBulletList = this.#rootPath + "/views/genres/genresBulletList";
  genresForm = this.#rootPath + "/views/genres/form";

  studiosList = this.#rootPath + "/views/studios/studiosList";
  studio = this.#rootPath + "/views/studios/studio";
  studioLinkCard = this.#rootPath + "/views/studios/studioLinkCard";
  studioToggleCard = this.#rootPath + "/views/studios/studioToggleCard";
  studiosForm = this.#rootPath + "/views/studios/form";
}

const views = new Views();
export default views;

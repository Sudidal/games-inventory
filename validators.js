import queries from "./db/queries.js";

class Validators {
  constructor() {}
  isNumberBetween(value) {
    const valueNum = parseFloat(value);
    if (valueNum < 0) return false;
    else if (valueNum > 5) return false;
    else return true;
  }
  async isLinkToImage(value) {
    const supportedFormats = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/svg",
    ];
    try {
      let good = false;
      const res = await fetch(value);
      for (let i = 0; i < supportedFormats.length; i++) {
        console.log(
          supportedFormats[i] + "||" + res.headers.get("content-type")
        );
        if (res.headers.get("content-type") === supportedFormats[i]) {
          good = true;
          break;
        }
      }
      if (good) return true;
      else throw "";
    } catch (err) {
      console.log(err);
      throw "";
    }
  }
  async isGameNotExist(value) {
    const gameExist = await queries.getGameByTitle(value);
    if (gameExist && gameExist.length > 0) {
      throw "Game name already exist";
    } else {
      return true;
    }
  }
  async isGenreNotExist(value) {
    const genreExist = await queries.getGenreByName(value);
    if (genreExist && genreExist.length > 0) {
      throw "Genre name already exist";
    } else {
      return true;
    }
  }
  async isStudioNotExist(value) {
    const studioExist = await queries.getStudioByName(value);
    if (studioExist && studioExist.length > 0) {
      throw "Studio name already exist";
    } else {
      return true;
    }
  }
}

const validators = new Validators();
export default validators;

import pool from "./pool.js";

class Queries {
  constructor() {}

  async getAllGames() {
    const { rows } = await this.query("SELECT * FROM games");
    return rows;
  }
  async getAllStudios() {
    const { rows } = await this.query("SELECT * FROM studios");
    return rows;
  }
  async getAllGenres() {
    const { rows } = await this.query("SELECT * FROM genres");
    return rows;
  }

  async getGame(gameId) {
    const { rows } = await this.query(
      "SELECT * FROM genres WHERE game_id = ($1)",
      [gameId]
    );
    return rows;
  }
  async getTopGames(limit) {
    const { rows } = await this.query(
      "SELECT * FROM genres ORDER BY rating DESC LIMIT($1)",
      [limit]
    );
    return rows;
  }
  async getGamesOrderByRating() {
    const { rows } = await this.query(
      "SELECT * FROM genres ORDER BY rating DESC"
    );
    return rows;
  }
  async getGamesOrderByNewest() {
    const { rows } = await this.query(
      "SELECT * FROM genres ORDER BY release_date DESC"
    );
    return rows;
  }
  async getGamesOrderByOldest() {
    const { rows } = await this.query(
      "SELECT * FROM genres ORDER BY release_date"
    );
    return rows;
  }

  async insertGame(
    title,
    rating,
    genreArr,
    releaseDate,
    logoUrl,
    bannerUrl,
    studioId
  ) {
    await this.query(
      "INSERT INTO games (title, rating, genre, release_date, logo_url, banner_url, studio_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [title, rating, genreArr, releaseDate, logoUrl, bannerUrl, studioId]
    );
    return true;
  }
  async insertGenre(genreName) {
    await this.query("INSERT INTO genres (genre_name) VALUES ($1)", [
      genreName,
    ]);
    return true;
  }
  async insertStudio(studioName) {
    await this.query("INSERT INTO studios (studio_name) VALUES ($1)", [
      studioName,
    ]);
    return true;
  }

  async query(text, params) {
    return pool.query(text, params);
  }
}

const queries = new Queries();
export default queries;

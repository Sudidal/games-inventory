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
  async getTopGames() {
    const { rows } = await this.query(
      "SELECT * FROM genres ORDER BY rating DESC LIMIT(10)"
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

  async query(text, params) {
    return pool.query(text, params);
  }
}

const queries = new Queries();
export default queries;

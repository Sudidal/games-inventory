import pool from "./pool.js";

class Queries {
  constructor() {}

  async getAllGames() {
    const { rows } = await pool.query("SELECT * FROM games");
    return rows;
  }
  async getAllStudios() {
    const { rows } = await pool.query("SELECT * FROM studios");
    return rows;
  }
  async getAllGenres() {
    const { rows } = await pool.query("SELECT * FROM genres");
    return rows;
  }
}

const queries = new Queries();
export default queries;

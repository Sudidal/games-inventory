import pool from "./pool.js";

const gamesColumns =
  "game_id, title, rating, genre, to_char(release_date, 'YYYY-MM-DD') as release_date, games.logo_url, banner_url, studio_name, games.studio_id, games.admin";

class Queries {
  constructor() {}

  //----------- Select queries
  // All
  async getAllGames() {
    const result = await this.selectQuery(
      `SELECT ${gamesColumns} FROM games INNER JOIN studios ON games.studio_id = studios.studio_id`
    );
    return result;
  }
  async getAllStudios() {
    const result = await this.selectQuery("SELECT * FROM studios");
    return result;
  }
  async getAllGenres() {
    const result = await this.selectQuery("SELECT * FROM genres");
    return result;
  }
  // Single
  async getGame(gameId) {
    const result = await this.selectQuery(
      `SELECT ${gamesColumns} FROM games INNER JOIN studios ON games.studio_id = studios.studio_id WHERE game_id = ($1)`,
      [gameId]
    );
    return result;
  }
  async getGenre(genreId) {
    const result = await this.selectQuery(
      `SELECT * FROM genres WHERE genre_id = ($1)`,
      [genreId]
    );
    return result;
  }
  async getStudio(studioId) {
    const result = await this.selectQuery(
      `SELECT * FROM studios WHERE studio_id = ($1)`,
      [studioId]
    );
    return result;
  }
  async getGameByTitle(title) {
    const result = await this.selectQuery(
      `SELECT * FROM games WHERE title = ($1)`,
      [title]
    );
    return result;
  }
  async getGenreByName(genreName) {
    const result = await this.selectQuery(
      `SELECT * FROM genres WHERE genre_name = ($1)`,
      [genreName]
    );
    return result;
  }
  async getStudioByName(studioName) {
    const result = await this.selectQuery(
      `SELECT * FROM studios WHERE studio_name = ($1)`,
      [studioName]
    );
    return result;
  }
  // Special
  async getTopGames(limit) {
    const result = await this.selectQuery(
      `SELECT ${gamesColumns} FROM games INNER JOIN studios ON games.studio_id = studios.studio_id ORDER BY rating DESC LIMIT($1)`,
      [limit]
    );
    return result;
  }
  async getTopGenres(limit) {
    const result = await this.selectQuery(`SELECT * FROM genres LIMIT ($1)`, [
      limit,
    ]);
    return result;
  }
  async getTopStudios(limit) {
    const result = await this.selectQuery(
      `SELECT studios.studio_name, studios.logo_url, studios.studio_id, COUNT(games.studio_id) FROM games RIGHT JOIN studios ON games.studio_id = studios.studio_id GROUP BY (studios.studio_id, studios.studio_name, studios.logo_url) ORDER BY (count) DESC LIMIT ($1)`,
      [limit]
    );
    return result;
  }
  async getGamesByStudio(studio_id) {
    const result = await this.selectQuery(
      `SELECT ${gamesColumns} FROM games INNER JOIN studios ON games.studio_id = studios.studio_id WHERE games.studio_id = ($1)`,
      [studio_id]
    );
    return result;
  }
  async getGamesByGenre(genreName) {
    const result = await this.selectQuery(
      `SELECT ${gamesColumns} FROM games INNER JOIN studios ON games.studio_id = studios.studio_id WHERE ($1) = ANY (genre)`,
      [genreName]
    );
    return result;
  }
  async getGamesOrderByRating() {
    const result = await this.selectQuery(
      "SELECT * FROM genres ORDER BY rating DESC"
    );
    return result;
  }
  async getGamesOrderByNewest() {
    const result = await this.selectQuery(
      "SELECT * FROM genres ORDER BY release_date DESC"
    );
    return rows;
  }
  async getGamesOrderByOldest() {
    const result = await this.selectQuery(
      "SELECT * FROM genres ORDER BY release_date"
    );
    return result;
  }

  //----------- Insert queries
  async insertGame(gameInfo) {
    const result = await this.mutateQuery(
      "INSERT INTO games (title, rating, genre, release_date, logo_url, banner_url, studio_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        gameInfo.title,
        gameInfo.rating,
        gameInfo.genre,
        gameInfo.releaseDate,
        gameInfo.logoUrl,
        gameInfo.bannerUrl,
        gameInfo.studioId,
      ]
    );
    return result;
  }
  async insertGenre(genreName) {
    const result = await this.mutateQuery(
      "INSERT INTO genres (genre_name) VALUES ($1)",
      [genreName]
    );
    return result;
  }
  async insertStudio(studioInfo) {
    const result = await this.mutateQuery(
      "INSERT INTO studios (studio_name, logo_url) VALUES ($1, $2)",
      [studioInfo.studioName, studioInfo.logoUrl]
    );
    return result;
  }

  //--------- Update queries
  async updateGame(gameId, gameInfo) {
    const result = await this.mutateQuery(
      "UPDATE games SET title = ($1), rating = ($2), genre = ($3), release_date = ($4), logo_url = ($5), banner_url = ($6), studio_id = ($7) WHERE game_id = ($8)",
      [
        gameInfo.title,
        gameInfo.rating,
        gameInfo.genre,
        gameInfo.releaseDate,
        gameInfo.logoUrl,
        gameInfo.bannerUrl,
        gameInfo.studioId,
        gameId,
      ]
    );
    return result;
  }

  //--------- Delete queries
  async deleteGame(gameId) {
    const result = await this.mutateQuery(
      "DELETE FROM games WHERE game_id = ($1)",
      [gameId]
    );
    return result;
  }
  async deleteStudio(studioId) {
    const result = await this.mutateQuery(
      "DELETE FROM studios WHERE studio_id = ($1)",
      [studioId]
    );
    return result;
  }
  async deleteGenre(genreId) {
    const result = await this.mutateQuery(
      "DELETE FROM genres WHERE genre_id = ($1)",
      [genreId]
    );
    return result;
  }

  async selectQuery(text, params) {
    try {
      const { rows } = await pool.query(text, params);
      return rows;
    } catch (err) {
      return err;
    }
  }
  async mutateQuery(text, params) {
    try {
      await pool.query(text, params);
      return true;
    } catch (err) {
      return err;
    }
  }
}

const queries = new Queries();
export default queries;

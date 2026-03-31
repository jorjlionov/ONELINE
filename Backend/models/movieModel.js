import { getDb } from '../database/db.js';

export const MovieModel = {
  async getAll() {
    const db = getDb();
    const movies = await db.all('SELECT * FROM movies ORDER BY id');
    
    for (const movie of movies) {
      if (movie.type === 'series') {
        movie.episodes = await this.getEpisodes(movie.id); // ← было getEpisode, исправлено на getEpisodes
      }
    }
    
    return movies;
  },

  async getById(id) {
    const db = getDb();
    const movie = await db.get('SELECT * FROM movies WHERE id = ?', id);
    
    if (movie && movie.type === 'series') {
      movie.episodes = await this.getEpisodes(id); // ← тоже исправьте если там getEpisode
    }
    
    return movie;
  },

  async getEpisodes(movieId) { // ← метод называется getEpisodes (с s)
    const db = getDb();
    return db.all(
      'SELECT id, episode_number as id, title, file FROM episodes WHERE movie_id = ? ORDER BY episode_number',
      movieId
    );
  },

  async createMovie({ title, poster, file }) {
    const db = getDb();
    const result = await db.run(
      'INSERT INTO movies (title, poster, type, file) VALUES (?, ?, ?, ?)',
      [title, poster, 'movie', file]
    );
    return result.lastID;
  },

  async createSeries({ title, poster, folder, episodes }) {
    const db = getDb();
    
    const result = await db.run(
      'INSERT INTO movies (title, poster, type, folder) VALUES (?, ?, ?, ?)',
      [title, poster, 'series', folder]
    );
    
    const movieId = result.lastID;
    
    for (let i = 0; i < episodes.length; i++) {
      await db.run(
        'INSERT INTO episodes (movie_id, episode_number, title, file) VALUES (?, ?, ?, ?)',
        [movieId, episodes[i].id || (i + 1), episodes[i].title, episodes[i].file]
      );
    }
    
    return movieId;
  },

  async delete(id) {
    const db = getDb();
    await db.run('DELETE FROM movies WHERE id = ?', id);
    return true;
  },

  async search(query) {
    const db = getDb();
    return db.all(
      "SELECT * FROM movies WHERE title LIKE ? ORDER BY title",
      [`%${query}%`]
    );
  }
};
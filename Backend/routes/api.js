import { Router } from 'express';
import { MovieModel } from '../models/movieModel.js';
import { getDb } from '../database/db.js'; // ← ДОБАВЬТЕ ЭТУ СТРОКУ!

const router = Router();

router.get('/movies', async (req, res) => {
  try {
    const movies = await MovieModel.getAll();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/movies/:id', async (req, res) => {
  try {
    const movie = await MovieModel.getById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/movies', async (req, res) => {
  try {
    const id = await MovieModel.createMovie(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/series', async (req, res) => {
  try {
    const id = await MovieModel.createSeries(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/movies/:id', async (req, res) => {
  try {
    await MovieModel.delete(req.params.id);
    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const movies = await MovieModel.search(req.query.q || '');
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/health', async (req, res) => {
  const db = getDb();
  const count = await db.get('SELECT COUNT(*) as count FROM movies');
  
  res.json({ 
    status: 'ok', 
    movies: count.count,
    timestamp: new Date().toISOString() 
  });
});

export default router;
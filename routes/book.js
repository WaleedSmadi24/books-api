import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET all books
router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM books');
  res.json(result.rows);
});

// GET book by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
  res.json(result.rows[0]);
});

// POST new book
router.post('/', async (req, res) => {
  const { title, author, year } = req.body;
  const result = await pool.query(
    'INSERT INTO books (title, author, year) VALUES ($1, $2, $3) RETURNING *',
    [title, author, year]
  );
  res.status(201).json(result.rows[0]);
});

// PUT update book
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, year } = req.body;
  const result = await pool.query(
    'UPDATE books SET title=$1, author=$2, year=$3 WHERE id=$4 RETURNING *',
    [title, author, year, id]
  );
  res.json(result.rows[0]);
});

// DELETE book
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM books WHERE id = $1', [id]);
  res.status(204).send();
});

export default router;

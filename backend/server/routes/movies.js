const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// GET /api/movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ year: -1 });
    res.json({ success: true, movies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to load movies.' });
  }
});

module.exports = router;

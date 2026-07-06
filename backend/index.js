// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const User = require('./models/User');
const Movie = require('./models/Movie');

const app = express();

// ─── Seed default user sal@gmail.com / 12345678 ───────────────────────
const seedData = async () => {
  try {
    const existing = await User.findOne({ email: 'sal@gmail.com' });
    if (!existing) {
      await User.create({ name: 'Sal', email: 'sal@gmail.com', password: '12345678' });
      console.log('✅ Seeded user: sal@gmail.com / 12345678');
    }
  } catch (e) { console.error('Seed user error:', e.message); }

  try {
    const count = await Movie.countDocuments();
    if (count === 0) {
      await Movie.insertMany([
        {
          title: 'Dune: Part Two',
          genre: 'Sci-Fi • Adventure',
          year: 2024,
          rating: 8.8,
          duration: '166 min',
          image: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
          description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
        },
        {
          title: 'Oppenheimer',
          genre: 'Drama • History',
          year: 2023,
          rating: 8.9,
          duration: '180 min',
          image: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
          description: 'The story of J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
        },
        {
          title: 'The Batman',
          genre: 'Action • Crime',
          year: 2022,
          rating: 8.4,
          duration: '176 min',
          image: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
          description: 'When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate.',
        },
        {
          title: 'Interstellar',
          genre: 'Sci-Fi • Drama',
          year: 2014,
          rating: 8.7,
          duration: '169 min',
          image: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
          description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        },
        {
          title: 'Inception',
          genre: 'Sci-Fi • Thriller',
          year: 2010,
          rating: 8.8,
          duration: '148 min',
          image: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
          description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.',
        },
        {
          title: 'The Dark Knight',
          genre: 'Action • Crime',
          year: 2008,
          rating: 9.0,
          duration: '152 min',
          image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
          description: 'When the Joker wreaks havoc on Gotham City, Batman must accept one of the greatest psychological and physical tests.',
        },
      ]);
      console.log('✅ Seeded 6 movies');
    }
  } catch (e) { console.error('Seed movies error:', e.message); }
};

const start = async () => {
  await connectDB();
  await seedData();
};
start();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));

app.get('/api/health', (req, res) => res.json({ success: true, message: '🎬 Running' }));

app.use(express.static(path.join(__dirname, '..')));
app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, '..', 'index.html')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

const express = require('express');
const router = express.Router();
const Pelicula = require('../models/Pelicula');

// Obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const peliculas = await Pelicula.find();
    res.json(peliculas);
  } catch (err) {
    console.error('❌ Error al obtener películas:', err);
    res.status(500).json({ mensaje: 'Error al obtener películas' });
  }
});

module.exports = router;

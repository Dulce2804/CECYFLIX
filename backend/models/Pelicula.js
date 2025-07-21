const mongoose = require('mongoose');

const PeliculaSchema = new mongoose.Schema({
  id: Number,
  titulo: String,
  descripcion: String,
  genero: String,
  poster: String
});

module.exports = mongoose.model('Pelicula', PeliculaSchema);

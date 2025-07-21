const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const peliculasRoutes = require('./routes/peliculas');
app.use('/api/peliculas', peliculasRoutes);

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Conectado a MongoDB Atlas');
  app.listen(PORT, () => console.log(`🚀 Backend corriendo en http://localhost:${PORT}`));
})
.catch(err => {
  console.error('❌ Error al conectar a MongoDB:', err);
});

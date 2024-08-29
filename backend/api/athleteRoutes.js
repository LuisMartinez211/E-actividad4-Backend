// backend/api/athleteRoutes.js

const express = require('express');
const { registerAthlete, getAllAthletes } = require('../controllers/athleteController');
const router = express.Router();
// api/athleteRoutes.js

const express = require('express');
const mongoose = require('mongoose');
const Athlete = require('../models/Athlete');

// Conectar a la base de datos si no está conectada
const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = async (req, res) => {
  await connectToDatabase();
    // Ruta para inscribir a un atleta
    router.post('/register', registerAthlete);

    // Ruta para obtener todos los atletas (opcional)
    router.get('/', getAllAthletes);
    // Aquí iría la lógica de manejo de rutas (GET, POST, etc.)
  if (req.method === 'GET') {
    const athletes = await Athlete.find();
    res.status(200).json(athletes);
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
};



module.exports = router;

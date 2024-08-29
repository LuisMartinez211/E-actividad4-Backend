// backend/api/dashboardRoutes.js

const mongoose = require('mongoose');
const Athlete = require('../models/Athlete');
const TimeRecord = require('../models/TimeRecord');

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

  if (req.method === 'GET' && req.url === '/statistics') {
    try {
      // Obtener el número total de atletas
      const totalAthletes = await Athlete.countDocuments();

      // Calcular el tiempo promedio de los atletas
      const averageTimeResult = await TimeRecord.aggregate([
        {
          $group: {
            _id: null,
            averageTime: { $avg: "$time" }
          }
        }
      ]);

      const averageTime = averageTimeResult.length > 0 ? averageTimeResult[0].averageTime : 0;

      const statistics = {
        totalAthletes,
        totalCategories: 3,
        averageTime,  // Agregar el tiempo promedio a las estadísticas
      };

      // Enviar las estadísticas como respuesta
      res.json(statistics);
    } catch (error) {
      console.error('Error al obtener las estadísticas:', error);
      res.status(500).json({ message: 'Error al obtener las estadísticas' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
};

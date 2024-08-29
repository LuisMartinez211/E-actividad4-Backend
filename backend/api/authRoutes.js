// backend/api/authRoutes.js

const mongoose = require('mongoose');
const { registerUser, loginUser } = require('../controllers/authController.js');

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

  if (req.method === 'POST') {
    if (req.url === '/register') {
      return registerUser(req, res);
    }
    if (req.url === '/login') {
      return loginUser(req, res);
    }
  }

  res.status(405).json({ message: 'Método no permitido' });
};

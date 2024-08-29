// backend/api/authRoutes.js

import mongoose from 'mongoose';
import { registerUser, loginUser } from '../controllers/authController.js';


// Conectar a la base de datos si no está conectada
const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default async (req, res) => {
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

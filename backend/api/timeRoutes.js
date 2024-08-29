// backend/api/timeRoutes.js

import mongoose from 'mongoose';
import { registerTime, getTimesByCategory, getOverallWinners } from '../controllers/timeController';

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

  if (req.method === 'POST' && req.url === '/register') {
    return registerTime(req, res);
  }

  if (req.method === 'GET') {
    if (req.url.startsWith('/category/')) {
      const category = req.url.split('/category/')[1];
      return getTimesByCategory(req, res, category);
    }

    if (req.url === '/winners') {
      return getOverallWinners(req, res);
    }
  }

  res.status(405).json({ message: 'Método no permitido' });
};

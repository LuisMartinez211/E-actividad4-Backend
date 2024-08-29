// backend/api/userRoutes.js

import mongoose from 'mongoose';
import { protect, authorize } from '../middleware/authMiddleware';
import { getUsers } from '../controllers/userController';

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

  if (req.method === 'GET' && req.url === '/users') {
    const isProtected = await protect(req, res);
    const isAuthorized = await authorize('admin')(req, res);
    
    if (isProtected && isAuthorized) {
      return getUsers(req, res);
    } else {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
  }

  res.status(405).json({ message: 'Método no permitido' });
};

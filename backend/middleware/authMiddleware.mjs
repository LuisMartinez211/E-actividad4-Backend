// authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../models/User';

// Middleware para proteger rutas
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Decodificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obtener el usuario del token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error('Error con el token:', error);
      res.status(401).json({ message: 'No autorizado, token fallido' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No autorizado, no hay token' });
  }
};

// Middleware para autorizar roles específicos
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'No autorizado, no tienes acceso a este recurso' });
    }
    next();
  };
};

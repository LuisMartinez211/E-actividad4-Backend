// backend/routes/authRoutes.js

const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController.js');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

module.exports = router;

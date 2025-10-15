require('dotenv').config();
const express = require("express");
const cors = require("cors");
const db = require("./config/database"); // Si usas conexión directa MySQL
const { sequelize } = require("./models"); // Conexión Sequelize
const artistaRoutes = require('./routes/artistas');
const usuariosRoutes = require('./routes/usuarios')
// TODO: Importar las rutas (las agregaremos después)
// const usuariosRoutes = require('./routes/usuarios');
// const playlistsRoutes = require('./routes/playlists');

const app = express();

// TODO: Configurar parseo de JSON
app.use(express.json({ limit: '10mb' }));

// TODO: Configurar CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// TODO: Configurar rutas
app.use('/api/v1/artistas', artistaRoutes);
app.use('/api/v1/usuarios', usuariosRoutes);
// app.use('/api/v1/playlists', playlistsRoutes);

// Ruta de prueba del servidor
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Servidor Spotify funcionando!",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    database: "Sequelize + MySQL"
  });
});

// Ruta de prueba de base de datos con Sequelize
app.get("/test-db", async (req, res) => {
  try {
    // Probar conexión con Sequelize
    await sequelize.authenticate();
    
    // Probar consulta básica
    const result = await sequelize.query("SELECT 1 + 1 AS result");
    
    res.json({
      success: true,
      message: "✅ Conexión a MySQL con Sequelize exitosa!",
      result: result[0][0].result,
      dialect: sequelize.getDialect()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "❌ Error de base de datos",
      details: error.message
    });
  }
});

// Ruta para ver el estado de los modelos
app.get("/models-status", async (req, res) => {
  try {
    const models = sequelize.models;
    const modelNames = Object.keys(models);
    
    res.json({
      success: true,
      message: "✅ Modelos cargados correctamente",
      models: modelNames,
      count: modelNames.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "❌ Error cargando modelos",
      details: error.message
    });
  }
});

// TODO: Configurar ruta 404 (debe ir después de todas las rutas)
app.use("", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Ruta no encontrada",
    path: req.originalUrl,
    method: req.method,
    availableRoutes: [
      "GET /",
      "GET /test-db", 
      "GET /models-status"
    ]
  });
});

// TODO: Configurar middleware de manejo de errores (debe ir al final)
app.use((error, req, res, next) => {
  console.error("Error:", error);
  
  // Errores de Sequelize
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      error: "Error de validación",
      details: error.errors.map(err => err.message)
    });
  }
  
  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      success: false,
      error: "Conflicto de datos únicos",
      details: error.errors.map(err => err.message)
    });
  }
  
  res.status(500).json({
    success: false,
    error: "Error interno del servidor",
    message: error.message
  });
});

module.exports = app;
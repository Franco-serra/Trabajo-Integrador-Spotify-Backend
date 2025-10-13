/**
 * Configuración principal de la aplicación Express
 * Los estudiantes deben completar la configuración de middlewares y rutas
 */

require('dotenv').config();
const express = require("express");
const cors = require("cors");
const db = require("./config/database");

// TODO: Importar las rutas (las agregaremos después)
// const usuariosRoutes = require('./routes/usuarios');
// const playlistsRoutes = require('./routes/playlists');

const app = express();

// TODO: Configurar parseo de JSON
app.use(express.json());

// TODO: Configurar CORS
app.use(cors());

// TODO: Configurar rutas
// app.use('/api/v1/usuarios', usuariosRoutes);
// app.use('/api/v1/playlists', playlistsRoutes);

// Ruta de prueba del servidor
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Servidor Spotify funcionando!",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

// Ruta de prueba de base de datos
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT 1 + 1 AS result");
    res.json({
      success: true,
      message: "✅ Conexión a MySQL exitosa!",
      result: rows[0].result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "❌ Error de base de datos",
      details: error.message
    });
  }
});

// TODO: Configurar ruta 404 (debe ir después de todas las rutas)
app.use("", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Ruta no encontrada",
    path: req.originalUrl
  });
});

// TODO: Configurar middleware de manejo de errores (debe ir al final)
app.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(500).json({
    success: false,
    error: "Error interno del servidor",
    message: error.message
  });
});

module.exports = app;

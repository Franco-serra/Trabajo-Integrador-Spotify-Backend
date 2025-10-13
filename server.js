/**
 * Punto de entrada del servidor
 * Los estudiantes deben completar la configuración del servidor Express
 */

require('dotenv').config();
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

// TODO: Configurar el servidor para escuchar en el puerto especificado
const server = app.listen(PORT, () => {
  // TODO: Agregar logs de inicio del servidor
  console.log(`🎵 Servidor Spotify Backend`);
  console.log(`📍 Puerto: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`🕐 Iniciado: ${new Date().toLocaleString()}`);
  console.log(`⚡ Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log('\n📋 Endpoints disponibles:');
  console.log(`   • http://localhost:${PORT}/ (Test servidor)`);
  console.log(`   • http://localhost:${PORT}/test-db (Test base de datos)`);
  console.log('──────────────────────────────────────────');
});

// TODO: Agregar manejo de errores del servidor
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Error: El puerto ${PORT} ya está en uso`);
    console.log('💡 Solución: Cambia el puerto en el archivo .env o cierra la aplicación que lo está usando');
  } else {
    console.error('❌ Error del servidor:', error.message);
  }
  process.exit(1);
});

// Manejo graceful de cierre
process.on('SIGINT', () => {
  console.log('\n🛑 Cerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Cerrando servidor (SIGTERM)...');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});
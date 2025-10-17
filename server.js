/**
 * Punto de entrada del servidor
 * Los estudiantes deben completar la configuración del servidor Express
 */

require('dotenv').config();
const app = require("./src/app");
const { sequelize } = require("./src/models"); // Importar Sequelize

const PORT = process.env.PORT || 3000;

// Función para inicializar la base de datos
const initializeDatabase = async () => {
  try {
    // TODO: Conectar y sincronizar la base de datos
    console.log('🔄 Conectando a la base de datos...');
    

    await sequelize.authenticate();
    console.log('✅ Conexión a MySQL establecida correctamente');
    

    console.log(`🗄️  Base de datos: ${sequelize.config.database}`);
    console.log(`🏠 Host: ${sequelize.config.host}`);
    console.log(`🔌 Dialecto: ${sequelize.getDialect()}`);
    
    return true;
  } catch (error) {
    console.error('❌ Error de base de datos:', error.message);
    console.log('💡 Verifica:');
    console.log('   • Que MySQL esté corriendo');
    console.log('   • Las credenciales en el archivo .env');
    console.log('   • Que la base de datos exista');
    return false;
  }
};

// Función principal de inicio
const startServer = async () => {
  // TODO: Configurar el servidor para escuchar en el puerto especificado
  console.log('🎵 Iniciando Servidor Spotify Backend...');
  
  // Inicializar base de datos primero
  const dbReady = await initializeDatabase();
  if (!dbReady) {
    console.log('🛑 No se pudo conectar a la base de datos. Saliendo...');
    process.exit(1);
  }
  
  // Iniciar servidor
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
    console.log(`   • http://localhost:${PORT}/models-status (Estado de modelos)`);
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

  return server;
};

// Manejo graceful de cierre con Sequelize
const gracefulShutdown = async (signal) => {
  console.log(`\n🛑 Recibido ${signal}. Cerrando servidor...`);
  
  try {
    // Cerrar conexión de Sequelize
    await sequelize.close();
    console.log('✅ Conexiones de base de datos cerradas');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error cerrando conexiones:', error);
    process.exit(1);
  }
};

// Iniciar la aplicación
startServer().then(server => {
  // Configurar manejadores de señales
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  
  // Manejar excepciones no capturadas
  process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Promesa rechazada no manejada:', reason);
  });
  
  process.on('uncaughtException', (error) => {
    console.error('❌ Excepción no capturada:', error);
    process.exit(1);
  });
});
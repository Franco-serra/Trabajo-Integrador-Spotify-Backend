
const express = require("express");
const router = express.Router();

// Importar todas las rutas
const artistaRoutes = require('./artistas');
const usuariosRoutes = require('./usuarios');
const albumesRoutes = require('./albumes');
const cancionRoutes = require('./canciones')
const generosRoutes = require('./generos');
const playlistsRoutes = require('./playlists');
const suscripcionesRoutes = require('./suscripciones');
const metodosPagoRoutes = require('./metodos-pago');
const pagosRoutes = require('./pagos');


// Configurar las rutas con sus prefijos
router.use('/api/v1/artistas', artistaRoutes);
router.use('/api/v1/usuarios', usuariosRoutes);
router.use('/api/v1/albumes', albumesRoutes);
router.use('/api/v1/canciones', cancionRoutes)
router.use('/api/v1/generos', generosRoutes );
router.use('/api/v1/playlists', playlistsRoutes);
router.use('/api/v1/suscripciones', suscripcionesRoutes);
router.use('/api/v1/metodos-pago', metodosPagoRoutes);
router.use('/api/v1/pagos', pagosRoutes);



router.get("/", (req, res) => {
  res.json({
    message: "API Spotify - Backend funcionando correctamente",
    version: "1.0.0",
    endpoints: {
      usuarios: "/api/v1/usuarios",
      artistas: "/api/v1/artistas",
      albumes: "/api/v1/albumes",
      canciones: "/api/v1/canciones",
      generos: "/api/v1/generos",
      playlists: "/api/v1/playlists",
      suscripciones: "/api/v1/suscripciones",
      metodosPago: "/api/v1/metodos-pago",
      pagos: "/api/v1/pagos",
      vistas: "/api/v1/vistas",
    },
  });
});

module.exports = router;

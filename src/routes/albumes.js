
const express = require("express");
const router = express.Router();
const { 
    getAllAlbumes, 
    createAlbum,
    getAlbumByArtistId,
    getCancionesByAlbumId
} = require("../controllers/albumesController");


// Ruta para obtener álbumes por ID de artista
router.get("/artista/:artista_id", getAlbumByArtistId);
// Ruta para obtener canciones de un álbum
router.get("/:album_id/canciones", getCancionesByAlbumId);
// Ruta para obtener todos los álbumes
router.get("/", getAllAlbumes);
// Ruta para crear un nuevo álbum
router.post("/", createAlbum);



module.exports = router;
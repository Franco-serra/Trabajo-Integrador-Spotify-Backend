
const express = require("express");
const router = express.Router();

const {
    crearPlaylist,
    agregarCancion,
    quitarCancionDePlaylist,
    eliminarPlaylist
} = require("../controllers/playlistsController");


router.post("/", crearPlaylist);
router.post("/:playlist_id/canciones", agregarCancion);
router.delete("/:playlist_id/canciones/:cancion_id", quitarCancionDePlaylist);
router.put("/:id", eliminarPlaylist);


module.exports = router;
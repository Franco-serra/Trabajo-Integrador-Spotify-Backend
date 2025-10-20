
const express = require("express");
const router = express.Router();
const { 
    createCancion,
    getCancionesConFiltros,
    asociarGeneroCancion,
    eliminarGeneroCancion
} = require('../controllers/cancionesController')

router.get('/', getCancionesConFiltros);
router.post('/', createCancion)
router.post('/:cancion_id/generos', asociarGeneroCancion);
router.delete('/:cancion_id/generos/:genero_id', eliminarGeneroCancion)

module.exports = router;
const express = require('express');
const {
    getAllArtistas,
    getArtistaById,
    getArtistasPaginados,
    createArtista
} = require('../controllers/artistasController');

const router = express.Router();

router.get('/paginados', getArtistasPaginados);

router.get('/', getAllArtistas);

router.post('/', createArtista);

router.get('/:id', getArtistaById);

module.exports = router;
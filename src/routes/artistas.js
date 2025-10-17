const express = require('express');
const {
    getAllArtistas,
    getArtistaById,
    getArtistasPaginados
} = require('../controllers/artistasController');

const router = express.Router();

router.get('/', getAllArtistas);

router.get('/', getArtistasPaginados);

router.get('/:id', getArtistaById);

module.exports = router;
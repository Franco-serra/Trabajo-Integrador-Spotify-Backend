
const express = require("express");
const router = express.Router();

const { 
    crearSuscripcion, 
    obtenerSuscripcionPorId
} = require("../controllers/suscripcionesController");


router.post("/", crearSuscripcion);
router.get("/:id", obtenerSuscripcionPorId);

module.exports = router;
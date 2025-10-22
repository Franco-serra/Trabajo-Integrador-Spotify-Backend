
const express = require("express");
const router = express.Router();

const { 
    crearSuscripcion, 

} = require("../controllers/suscripcionesController");


router.post("/", crearSuscripcion);

module.exports = router;
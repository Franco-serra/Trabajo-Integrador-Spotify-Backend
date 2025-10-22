
const express = require("express");
const router = express.Router();

const { 
    crearMetodoPago,
    listarMetodosPago
} = require("../controllers/metodosPagoController");

router.post("/", crearMetodoPago);
router.get("/", listarMetodosPago);

module.exports = router;
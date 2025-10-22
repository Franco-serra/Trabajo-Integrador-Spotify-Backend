
const express = require("express");
const router = express.Router();
const { 
    registrarPago,
    listarPagos
} = require("../controllers/pagosController");

router.post("/", registrarPago);
router.get("/", listarPagos);

module.exports = router;

const express = require("express");
const router = express.Router();
const generosController =  require("../controllers/generosController");

router.get("/", generosController.getAllGeneros);
router.post("/", generosController.createGenero);

module.exports = router;

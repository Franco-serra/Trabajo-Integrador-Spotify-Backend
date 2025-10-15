
const express = require("express");
const { 
    createUser,
    getAllUsers, 
    getUserById,
    updateUserPass,
    getUserPasswordVencida
    } = require("../controllers/usuariosController");

const router = express.Router();

router.post('/', createUser)
router.get('/', getAllUsers)
router.get('/password-vencidas', getUserPasswordVencida);
router.get('/:id', getUserById);
router.put('/:id',updateUserPass)


module.exports = router;
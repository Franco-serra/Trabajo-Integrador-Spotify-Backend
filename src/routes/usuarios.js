
const express = require("express");
const { 
    createUser,
    getAllUsers, 
    getUserById,
    updateUserPass,
    getUserPasswordVencida,
    deleteUser,
    restoreUser
    } = require("../controllers/usuariosController");

const router = express.Router();

router.post('/', createUser)

router.get('/', getAllUsers)
router.get('/password-vencidas', getUserPasswordVencida);
router.get('/:id', getUserById);
router.put('/:id', updateUserPass)
router.delete('/:id', deleteUser);
router.put('/restore/:id', restoreUser);



module.exports = router;
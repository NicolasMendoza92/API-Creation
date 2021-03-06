// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const { check } = require('express-validator');

// Crear un usuario

// api/users
router.post('/',
    // estas son validaciones que se hacen antes de llamar al la funcion "createUser"
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un Email Valido').isEmail(),
        check('password', 'El password debe tener mínimo de 6 caracteres').isLength({ min: 6 }),
    ],
    userController.createUser);

// defino las rutas que voy a usar y las llamo de userController

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.modifyUser);
router.delete('/:id', userController.eraseUser);

module.exports = router;
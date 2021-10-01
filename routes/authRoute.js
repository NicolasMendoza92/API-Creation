// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");
const { check } = require('express-validator');

// Crear un usuario

// api/users
router.post('/register',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un Email Valido').isEmail(),
        check('password', 'El password debe tener mínimo de 6 caracteres').isLength({ min: 6 }),
    ],
    authController.register);

router.post('/login', [
    check('email', 'Agrega un Email Valido').isEmail(),
    check('password', 'El password debe tener mínimo de 6 caracteres').isLength({ min: 6 })
    ],
 authController.login);

 //Obtener usuario autenticado
router.get('/', authController.getUserAuthentic);

module.exports = router;
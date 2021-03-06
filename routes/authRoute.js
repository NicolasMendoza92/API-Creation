// Rutas necesarias 
const express = require('express');
const router = express.Router();

// importamos la que necestiemos 
const authController = require("../controllers/authController");
const { check } = require('express-validator');

// Registrar un usuario, defino las rutas con sus metodos correspondientes. 

router.post('/register',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un Email Valido').isEmail(),
        check('password', 'El password debe tener mínimo de 6 caracteres').isLength({ min: 6 }),
    ],
    authController.register);


// aca le ponemos /login, para que sea /auth/login
router.post('/login', [
    check('email', 'Agrega un Email Valido').isEmail(),
    check('password', 'El password debe tener mínimo de 6 caracteres').isLength({ min: 6 })
    ],
 authController.login);

 //Obtener usuario autenticado - lo obteneos con el token y el metodo get 
router.get('/', authController.getUserAuthentic);

module.exports = router;
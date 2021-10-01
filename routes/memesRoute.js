// Rutas para memes 
const express = require('express');
const router = express.Router();
const memeControllers = require('../controllers/memeController')

// cuando recibamos una consulta de tipo (post,get, ... se va a llamar a la funcion que esta en memeController)
router.post('/', memeControllers.createMeme);
router.get('/', memeControllers.getMemes);
// cuando pongo /:xx - estoy diciendo que despues de la / sera ese xx que defini
router.put('/:id', memeControllers.modifyMeme);
router.get('/:id', memeControllers.getMeme);
router.delete('/:id', memeControllers.eraseMeme);

module.exports = router;
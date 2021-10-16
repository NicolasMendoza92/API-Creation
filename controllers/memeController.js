// Importo el esquema del modelo objeto (meme)
const Meme = require('../models/Meme');
const jwt = require('jsonwebtoken');

exports.createMeme = async (req, res) => {
  try {
    // Leer token - esto lo hacemos en header ( es una parte de la request como el body donde podemos enviar datos )
    const token = req.header('x-auth-token');

    // Revisar Token
    if (!token) {
      // esto es para cuando el usuario no esta logeado
      return res.status(401).json({ msg: 'No hay Token, permiso no valido' });
    }

    const cifrado = jwt.verify(token, process.env.SECRET);
    
    // nuevo meme 
    // aca le sumo que ademas de todo lo que tiene, que traiga la prop creater -  a la hora de crear un meme aparecera el usuario creador 
    const meme = new Meme({...req.body, creater : cifrado.user.id });
    meme.date = new Date();

    //guardar meme
    await meme.save();

    //mensaje de exito
    res.send("Meme Creado Correctamente");
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.getMemes = async (req, res) => {
  try {
    // usamos el metodo "populate" - este nos sirve para hacer publico los datos y le pongo en "string" de los datos que quiero que traiga puedo poner "creater. pero yo lo puedo acotar e indicar que dato queiro que muestre 
    const memes = await Meme.find().populate({path: 'creater', select: 'name'});
    res.send(memes);

  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.eraseMeme = async (req, res) => {
  try {
    const meme = await Meme.findByIdAndDelete(req.params.id);
    res.send('meme eliminado');
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.modifyMeme = async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id);
    // validamos si se envia un dato que no es acorde, no lo modifique 
    if (req.body.hasOwnProperty('title')) {
      meme.title = req.body.title;
    }
    if (req.body.hasOwnProperty('image')) {
      meme.image = req.body.image;
    }
    await meme.save();
    res.send(meme)
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.getMeme = async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id);
    res.send(meme);

  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
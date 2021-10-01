// Importo el esquema del modelo objeto (meme)
const Meme = require('../models/Meme');

exports.createMeme = async (req, res) => {
    try {
        // nuevo meme 
      const meme = new Meme(req.body);
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
        const memes = await Meme.find();
        res.send(memes);
        
    } catch (error) {
      console.log(error);
      res.status(400).send("Hubo un error");
    }
  };

  exports.eraseMeme = async (req, res) => {
    try {
        const meme= await Meme.findByIdAndDelete(req.params.id);
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
        if (req.body.hasOwnProperty('title')){
            meme.title = req.body.title;
        }   
        if (req.body.hasOwnProperty('image')){
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
        const meme= await Meme.findById(req.params.id);
        res.send(meme);

    } catch (error) {
      console.log(error);
      res.status(400).send("Hubo un error");
    }
  };

const User = require("../models/User");
const bcryptjs = require('bcryptjs');
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  // revisamos errores 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  const { email, password } = req.body;

  try {
    let userfind = await User.findOne({ email });
    if (userfind) {
      return res.status(400).send('Ya existe cuenta con este Email');
    }

    let user = new User(req.body);

    //hashear el password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    //guardar usuario
    await user.save();

    //mensaje de exito
    res.send("Usuario Creado Correctamente");
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.getUsers = async (req, res) => {
  try {
      const users = await User.find();
      res.send(users);
  } catch (error) {
      res.status(400).send('Hubo un error en la conexion a la base de datos');
  }
};

exports.getUser = async (req, res) => {
  try {
      const user = await User.findById(req.params.id).select('name email');
      res.send(user);
  } catch (error) {
      res.status(400).send('Hubo un error en la conexion a la base de datos');
  }
};

exports.modifyUser = async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      if (!req.body.name) {
          return res.status(400).send('Dato de nombre incompleto');
      }
      user.name = req.body.name;
      await user.save();
      res.send(user);
  } catch (error) {
      res.status(400).send('Hubo un error en la conexion a la base de datos');
  }
};

exports.eraseUser = async (req, res) => {
  try {
      await User.findByIdAndDelete(req.params.id);
      res.send('usuario eliminado');
  } catch (error) {
      res.status(400).send('Hubo un error en la conexion a la base de datos');
  }
};

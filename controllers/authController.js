const User = require("../models/User");
const bcryptjs = require('bcryptjs');
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    // revisamos errores 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array() });
    }
    // desectructuracion de prop del objeto
    const { email, password } = req.body;

    try {
        let userfind = await User.findOne({ email });
        if (userfind) {
            return res.status(400).send('Ya existe cuenta con este Email');
        }

        const bodyUser = { ...req.body, role: 'user' };
        let user = new User(bodyUser);

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

exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array() });
        }
        // desesctructuramos las prop 
        const { email, password } = req.body;


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'usuario no existe' });
        }
        // password revisar 
        const passCorrect = await bcryptjs.compare(password, user.password);
        if (!passCorrect) {
            return res.status(400).json({ msg: 'Password incorrecto' });
        }

        // Si todo es correcto Crear y firmar JWT (el token - alfanumerico de datos)
        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
        };
        jwt.sign(
            payload,
            // usamos la vble de entorno como el url de mongo 
            process.env.SECRET,
            {
                expiresIn: 3600, //1 hora
            },
            (error, token) => {
                if (error) throw error;
                res.json({ token });
            }
        );

    } catch (error) {
        res.status(400).send('la puta madre');
    }
};

exports.getUserAuthentic = async (req, res) => {
    // Leer token
    const token = req.header('x-auth-token');
    // Revisar Token
    if (!token) {
        return res.status(401).json({ msg: 'No hay Token, permiso no valido' });
    }

    // Validar Token
    try {
        const cifrado = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(cifrado.user.id).select('name role email');
        res.send(user);
    } catch (error) {
        res.status(401).json({ msg: 'Token no valido la puta madre' });
    }
};



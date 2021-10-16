const mongoose = require('mongoose');
const MemesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    creater:{
        // conectamos los Schema de mongoose, en este caso queiro traer info del modelo User
        type: mongoose.Schema.Types.ObjectId, 
        // aca traemos la referencia de donde va a traer esa info 
        ref:'User', 
        require: true, 
    }
});

module.exports = mongoose.model('Meme', MemesSchema);
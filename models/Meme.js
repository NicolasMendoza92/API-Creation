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
});

module.exports = mongoose.model('Meme', MemesSchema);
const User = require('./User');
const { Schema, model } = require('mongoose');

const highscoreSchema = new Schema({
    category: {
        type: String,
        required: true,
    },
    score: {
        type: Number
    },
    user: [User.Schema]
});

const HighScore = model('HighScore', highscoreSchema);

module.exports = HighScore;
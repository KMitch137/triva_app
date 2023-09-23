const { Schema, model } = require('mongoose');

const highscoreSchema = new Schema({
    category: {
        type: String,
        required: true,
    },
    score: {
        type: Number
    },
    userName: {
      type: String,
      required: true
    }
});

const HighScore = model('HighScore', highscoreSchema);

module.exports = HighScore;
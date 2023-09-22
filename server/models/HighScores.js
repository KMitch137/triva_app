const { Schema, model } = require('mongoose');

const highscoreSchema = new Schema({
    category: {
        type: String,
        required: true,
    },
    score: {
        type: Number
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User"
    }
});

const HighScore = model('HighScore', highscoreSchema);

module.exports = HighScore;
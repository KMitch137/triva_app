const { Schema, model } = require('mongoose');

const triviaSchema = new Schema({
  question: {
    type: String,
    required: true,
    unique: true,
  },
  answer: {
    type: String,
    required: true,
  },
  /* TODO: Make sure to add 3 choices for total of 4 incuding the answer. */
  choices: [{
    type: String,
    required: true,
  }],
});

const Question = model('Question', triviaSchema);

module.exports = Question;

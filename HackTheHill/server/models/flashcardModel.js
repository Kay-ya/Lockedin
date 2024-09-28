const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  topic: String,
  basicInfo: {
    term: String,
    definition: String,
    example: String,
    additionalNotes: String
  },
  intermediateInfo: {
    term: String,
    definition: String,
    example: String,
    additionalNotes: String
  },
  advancedInfo: {
    term: String,
    definition: String,
    example: String,
    additionalNotes: String
  }
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

module.exports = Flashcard;

const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  length: {
    type: String,
    required: true,
    min: 0,
  },
  releaseYear: {
    type: Number,
  },
  coverUrl: {
    type: String,
  },
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;

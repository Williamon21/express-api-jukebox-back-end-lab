const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    required: true,
    min: 0,
  },
  releaseYear: {
    type: Number
  },
});

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;

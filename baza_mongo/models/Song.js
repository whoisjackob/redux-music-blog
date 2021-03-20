const { Schema, model } = require('mongoose');

const songSchema = new Schema({
  title: String,
  author: String,
  release: Date,
});

module.exports = model('Song', songSchema);

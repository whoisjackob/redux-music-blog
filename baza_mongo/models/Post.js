const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  title: String,
  body: String,
  comments: Array,
});

module.exports = model('Post', postSchema);

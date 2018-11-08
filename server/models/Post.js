const mongoose = require('mongoose')
const Schema = mongoose.Schema

var postDataSchema = new Schema(
  {
    titulo: { type: String, required: true },
    subtitulo: String,
    content: String,
    // author: [Schema.Types.ObjectId],
    author: [String],
    permalink: String,
    published_at: String,
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
  },
  { collection: 'posts' }
)

module.exports = mongoose.model('Post', postDataSchema)

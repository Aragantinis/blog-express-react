const mongoose = require('mongoose')
const Schema = mongoose.Schema

var commentDataSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
  },
  { collection: 'comments' }
)

module.exports = mongoose.model('Comment', commentDataSchema)

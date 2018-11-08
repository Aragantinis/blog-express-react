const mongoose = require('mongoose')
const Schema = mongoose.Schema

var authorDataSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      index: true,
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    middleName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    updated_at: {
      type: Date,
      default: Date.now,
      select: false,
    },
    created_at: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  { collection: 'authors' }
)

module.exports = mongoose.model('Author', authorDataSchema)

//mongoose 
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
   },
   name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
   },
   email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
   },
   password: {
      type: String,
      required: true,
      minlength: 6,
   },
   points: {
      type: String,
      default: 0,
   }
}, {
   timestamps: true,
})

// export schema as a model

module.exports = mongoose.model('User', UserSchema)

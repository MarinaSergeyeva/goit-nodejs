const mongoose = require('mongoose');

// {
//   email: String,
//   password: String,
//   subscription: {
//     type: String,
//     enum: ["free", "pro", "premium"],
//     default: "free"
//   },
//   token: String
// }

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'User must have email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'User must have password'],
  },
  subscription: {
    type: String,
    enum: ['free', 'pro', 'premium'],
    default: 'free',
  },
  token: String,
});

class UserModel {
  constructor() {
    this.db = mongoose.connect('User', userSchema);
  }
}

module.exports = new UserModel();

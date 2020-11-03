const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'User must have email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    role: {
      type: String,
      enum: ['user', 'moderator', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please provide a valid password'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same',
      },
    },
    passwordChangedAt: Date,
    subscription: {
      type: String,
      enum: ['free', 'pro', 'premium'],
      default: 'free',
    },
    token: {
      type: String,
      // required: [true, 'User must have token'],
    },
    avatarURL: String,
  },
  { versionKey: false },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  const result = await bcrypt.compare(candidatePassword, userPassword);
  return result;
};

// userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
//   if (this.passwordChangedAt) {
//     const changedTimestamp = parseInt(
//       this.passwordChangedAt.getTime() / 1000,
//       10,
//     );

//     return JWTTimestamp < changedTimestamp;
//   }
//   return false;
// };

userSchema.plugin(mongoosePaginate);

class UserModel {
  constructor() {
    this.db = mongoose.model('User', userSchema);
  }

  signup = async userInfo => {
    return await this.db.create(userInfo);
  };

  login = async ({ email }) => {
    return await this.db.findOne({ email }).select(`+password`);
  };

  getAllUsers = async options => {
    return await this.db.paginate({}, options, function (err, result) {
      return result.docs;
    });
  };

  getUserById = async id => {
    return await this.db.findById(id);
  };

  updateUserInfo = async (id, info) => {
    return await this.db.findByIdAndUpdate(id, info, { new: true });
  };
}

module.exports = new UserModel();

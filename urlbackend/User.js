const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const analyticsSchema = new mongoose.Schema({
  clicks: {
    type: Number,
    default: 0,
  },
});

const shortenedUrlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
  },
  analytics: analyticsSchema,
});

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please tell your name"],
  },
  Email: {
    type: String,
    required: [true, "please provie your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    // required: true,
    validate: {
      validator: function (el) {
        ///this method only works on create and save methods
        return el === this.password;
      },
      message: "Passwords are not same",
    },
  },
  shortenedUrls: [shortenedUrlSchema],
});
userSchema.pre("save", async function (next) {
  //only run this function if password is actually modified
  if (!this.isModified("password")) return next();

  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("User", userSchema);

// const User = mongoose.model("User", userSchema);

// module.exports = User;

// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const analyticsSchema = new mongoose.Schema({
//   clicks: {
//     type: Number,
//     default: 0,
//   },
// });

// const shortenedUrlSchema = new mongoose.Schema({
//   originalUrl: {
//     type: String,
//     required: true,
//   },
//   shortCode: {
//     type: String,
//     required: true,
//   },
//   analytics: analyticsSchema,
// });

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   shortenedUrls: [shortenedUrlSchema],
// });

// userSchema.pre('save', async function (next) {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(this.password, salt);
//     this.password = hashedPassword;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

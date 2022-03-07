const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      maxlength: [30, 'Name should be under 30 character'],
      minlength: [3, 'Name should be atleast 3 character'],
      trim: true,
    },
    lastname: {
      type: String,
      maxlength: 30,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provid an Email'],
      validate: [validator.isEmail, 'Please enter email in correct format'],
      trim: true,
      unique: true,
    },
    userinfo: {
      type: String,
      // required: true,
    },

    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'password should be atleast 6 character'],
    },

    role: {
      type: Number,
      default: 0,
    },

    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

//encrypt password before save
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
});

//validate the password with passed on user password
userSchema.methods.isValidatePassword = async function (userEnterPassword) {
  return await bcrypt.compare(userEnterPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

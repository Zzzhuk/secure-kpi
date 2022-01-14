const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userScheme = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please, enter your email'],
    unique: [true, 'This email exists!'],
    lowerCase: true,
    validate: [val =>  /.+@.+\..+/.test(val), 'Invalid email!']
  },
  password: {
    type: String,
    required: [true, 'Please, enter your password'],
    validate: [val => /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(val), 'The string must contain: 1 symbol "a-z", 1 - "A-Z", 1 - "0-9", min length - 6 symbols']
  }
});

userScheme.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userScheme.statics.login = async function (email, password) {
  const user = await this.findOne({email});
  if(user) {
    const authRes = await bcrypt.compare(password, user.password);
    if(authRes) {
      return user;
    }
    throw Error('incorrect pass')
  }
  throw Error('incorrect email')
};

const User = mongoose.model('user', userScheme);

module.exports = User;

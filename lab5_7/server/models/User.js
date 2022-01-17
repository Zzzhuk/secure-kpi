const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cipher = require('../utils/aesCipher')
const mongooseLeanGetter = require('mongoose-lean-getters')

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
  },
  firstName: {
    type: String,
    default: null,
    get: async v => await cipher.decrypt(v),
    set: cipher.encrypt
  },
  lastName: {
    type: String,
    default: null,
    get: async v => await cipher.decrypt(v),
    set: cipher.encrypt
  },
  job: {
    type: String,
    default: null,
    get: async v => await cipher.decrypt(v),
    set: cipher.encrypt
  },
  token: {type: String, default: null}
}, {
  collection: 'userInfo',
  versionKey: false,
  runSettersOnQuery: true,
});


userScheme.plugin(mongooseLeanGetter)

userScheme.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(5);
  this.password = await bcrypt.hash(this.password, salt);
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      job: this.job
    },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    });

  this.token = token;
  next();
});


// userScheme.pre('update', async function (next) {
//   next();
// });

userScheme.statics.login = async function ({email, password}) {
  const user = await this.findOne({email});
  if (user) {
    const authRes = await bcrypt.compare(password, user.password);
    if (authRes) {
      return user;
    }
    throw Error('incorrect pass')
  }
  throw Error('incorrect email')
};

userScheme.statics.logOut = async function (token) {
  const user = await this.findOne({token}).lean();
  if (user) {
    user.token = null;
  }
  throw Error('Wrong token')
};

userScheme.statics.updateData = async function (token, data) {
  const user = await this.findOneAndUpdate({token}, data).lean({getters: true});
  if(user){
    return user;
  }
  throw Error('incorrect token')
};
userScheme.statics.getUser = async function (token) {
  const user = await this.findOne({token}).lean({getters: true});
  console.log('users', user)
  if(user){
    return user;
  }
  throw Error('incorrect token')
};

const User = mongoose.model('user', userScheme);

module.exports = User;

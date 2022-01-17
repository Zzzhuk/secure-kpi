const User = require('../models/User');
const jwt = require('jsonwebtoken');
const cipher = require('../utils/aesCipher');

module.exports.signUp = async (req, res) => {
  const data = req.body;
  try {
    const userRes = await User.create(data);

    res.status(201).json({token: userRes.token});
  } catch (e) {
    console.error('Error sign up:', e);
    res.status(400).json({error: 'Error, user not created!'});
  }
};

module.exports.login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const userRes = await User.login({email, password});

    res.status(200).json({token: userRes.token});
  } catch (e) {
    console.error('Error login:', e);
    res.status(400).json({error: 'Error login! Wrong password or email'})
  }
};

module.exports.logOut = async (req, res) => {
  const {email, password} = req.body;
  try {
    const userRes = await User.logOut(token);

    res.status(200).json(true);
  } catch (e) {
    console.error('Error login:', e);
    res.status(400).json({error: 'Error login! Wrong password or email'})
  }
};

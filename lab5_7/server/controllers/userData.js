const User = require('../models/User');
const jwt = require('jsonwebtoken');
const cipher = require('../utils/aesCipher');

module.exports.getUser = async (req, res) => {
  const token = req.headers['x-access-token'];
  try {
    const {_id, email, firstName, lastName, job} = await User.getUser(token);
    console.log('firstName', firstName)
    res.status(201).json({id: _id, email, firstName, lastName, job});
  } catch (e) {
    console.error('Error get user:', e);
    res.status(400).json({error: 'Error get user!'});
  }
};

module.exports.updateUser = async (req, res) => {
  const token = req.headers['x-access-token'];
  const data = req.body;
  try {
    const {_id, email, firstName, lastName, job} = await User.updateData(token, data);

    res.status(200).json({id: _id, email, firstName, lastName, job});
  } catch (e) {
    console.error('Error updateUser:', e);
    res.status(400).json({error: 'Error updateUser!'})
  }
};

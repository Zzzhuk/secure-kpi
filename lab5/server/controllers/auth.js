const User = require('../models/User');

module.exports.signUp = async (req, res) => {
  const {email, password} = req.body;
  try {
   const userRes = await User.create({email, password});

   res.status(201).json(userRes);
  } catch (e) {
    console.error('Error sign up:', e);
    res.status(400).json({error: 'Error, user not created!'});
  }
};

module.exports.login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const userRes = await User.login(email, password);

    res.status(200).json({email: userRes.email, id: userRes._id});
  } catch (e) {
    console.error('Error login:', e);
    res.status(400).json({error: 'Error login! Wrong password or email'})
  }
};

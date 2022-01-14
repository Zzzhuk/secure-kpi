const express = require('express');
const router = express.Router();

const Record = require('../models/Records');

router.get('/', async (req, res) => {
  res.json(await Record.find());
});


router.post('/sign-up', async (req, res) => {
  const record = new Record(req.body);
  const isRecord = await record.save();
  console.log('isRecord', isRecord)
  res.json(true);
});

router.get('/login', async (req, res) => {
  const user = await Record.find({
    login: req.params.login,
    password: req.params.password
  });

  console.log('log user', user);


  if(!!user) {
    res.json(!!user);
  } else {
    res.status(404).json('Error! Please, check your password or E-mail')
  }
});


module.exports = router;

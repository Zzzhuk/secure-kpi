const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const config = require('./config');

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', {error: err});
}

const app = express();

app.set('port', 3000);

app.listen(app.get('port'), () => {
  console.log(`[OK] Server is running on localhost:${app.get('port')}`);
});

mongoose.connect(config.connectionString, {useNewUrlParser: true})
  .then(db => console.log('[OK] DB is connected'))
  .catch(err => console.error(err));

app.use(express.json());
app.use(errorHandler);
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));

app.use('/api', require('./routes/auth'));

app.use('/', express.static(path.join(__dirname, '../dist')));

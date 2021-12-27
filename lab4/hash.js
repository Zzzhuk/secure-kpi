const bcrypt = require('bcrypt');
const saltedMd5 = require('salted-md5');

const strToHex = (text) => {
  let hex, i;

  let result = '';
  for (i=0; i<text.length; i++) {
    hex = text.charCodeAt(i).toString(16);
    result += ('000'+hex).slice(-4);
  }

  return result
};

const MD5 = (text, salt) => {
  const saltedHash = saltedMd5(text, salt);
  return saltedHash
};

const bCrypt = (text, salt) => {
  const saltRounds = 10;
  let tmpSalt = salt || bcrypt.genSaltSync(saltRounds);

  return bcrypt.hashSync(text, tmpSalt);
};

module.exports = {
  MD5, bCrypt
}

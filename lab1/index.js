const fs = require('fs');

const cipherXor = (text = '', key) => {
  let crypt = [...text].map(t => {
    return t.charCodeAt(0) ^ key;
  });

  return String.fromCharCode(...crypt);
};

const decipher = () => {
  let text = fs.readFileSync('encrypted.txt', 'utf8');



  fs.writeFileSync('decrypted.txt', '');
};

decipher();


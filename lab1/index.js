const fs = require('fs');

const cipherXor = (text = '', key) => {
  let crypt = [...text].map(t => {
    return t.charCodeAt(0) ^ key;
  });

  return String.fromCharCode(...crypt);
};

const cipherHexXor = (text = '', key) => {
  let crypt = [];
  for (let i = 0; i < text.length; i += 2) {
    const b = parseInt(text.slice(i, i + 2), 16) ^ key;
    crypt.push(b);
  }
  return String.fromCharCode(...crypt);
};

const getQuotient = (text) => {
  let sum = [...text].reduce((rSum, char) => {
    let cCode = char.charCodeAt(0);
    if (cCode >= 32 && cCode <= 90 || cCode >= 97 && cCode <= 122) {
      return rSum + 1;
    }
    return rSum - 1;
  }, 0);
  return sum;
};

const decipher = () => {
  const text = fs.readFileSync('encrypted.txt', 'utf8');

  const tests = [];

  for (let key = 0; key < 255; key++) {
    const encrText = cipherHexXor(text, key);
    tests.push({
      quotient: getQuotient(encrText),
      text: encrText
    });
  };

  const fByQuotient = tests.find(t => {
    let max = Math.max(...tests.map(tC => tC.quotient));
    return t.quotient === max;
  });

  fs.writeFileSync('decrypted.txt', fByQuotient?.text || 'Fail');
};

decipher();


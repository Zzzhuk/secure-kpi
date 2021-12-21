const fs = require('fs');

const cipherXor = (text = '', key) => {
  let crypt = [...text].map(t => {
    return t.charCodeAt(0) ^ key;
  });

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

const cipherVig = (text = '', keyLength) => {
  const blocks = new Array(keyLength).fill('');
  for (let i = 0; i < text.length; i += keyLength) {
    for (let j = 0; j < keyLength; j++) {
      blocks[j] += text[(i + j) % text.length];
    }
  }

  const decodedBlocks = blocks.map((b, idx) => {
    const tests = [];
    for (let key = 0; key < 255; key++) {
      const encrText = cipherXor(b, key);
      tests.push({
        quotient: getQuotient(encrText),
        text: encrText
      });
    };

    const fByQuotient = tests.find(t => {
      let max = Math.max(...tests.map(tC => tC.quotient));
      return t.quotient === max;
    });

    return fByQuotient?.text || '';
  });

  const textArr = [];
  for (let i = 0; i < decodedBlocks[0].length; i++) {
    for (let j = 0; j < decodedBlocks.length; j++) {
      textArr.push(decodedBlocks[j][i]);
    }
  }
  return textArr.join('');
};

const getCoincidence = (text) => {
  const peaks = new Array(text.length).fill(0);

  for (let i = 0; i < text.length; i++) {
    for (let j = 0; j < text.length; j++) {
      if (text[j] === text[(i + j) % text.length]) {
        peaks[i]++;
      }
    }
  }
  return peaks;
};


const decipher = () => {
  const text = fs.readFileSync('encrypted.txt', 'utf8');

  const textBuff = Buffer.from(text, 'base64').toString();

  const coincidence = getCoincidence(textBuff);

  fs.writeFileSync('coincidence.txt', JSON.stringify(coincidence));

  const keyLength = 3; //Check coincidence.txt, peak will be every after third;

  const decodedText = cipherVig(textBuff, keyLength);

  fs.writeFileSync('decrypted.txt', decodedText);
};

decipher();


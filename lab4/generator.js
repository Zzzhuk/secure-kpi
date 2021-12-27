const fs = require('fs');

let words = fs.readFileSync('res/words.txt', 'utf8');
words = words.split('\r\n');
let names = fs.readFileSync('res/names.txt', 'utf8');
names = names.split('\r\n');

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const charToNumWithCamel = (word) => {
  const trChars = {
    a: '4',
    b: '6',
    e: '3',
    l: '1',
    o: '0',
    s: '2',
    f: '5'
  };

  let mappedWords = [...word].map(c => {
    let char = trChars[c] || c;
    let rand = getRandomInt(0, 1);
    if (rand) {
      return char.toUpperCase();
    }
    return char;
  })

  return mappedWords.join('');
};

const combNumWords = () => {

  const pos = getRandomInt(0, 4);
  const word = getRandomInt(0, 5);

  const tmpWord = word <= 2 ? words[getRandomInt(0, words.length - 1)] : names[getRandomInt(0, names.length - 1)]
  return pos <= 3 ? `${tmpWord}${getRandomInt(0, 99999)}` : `${getRandomInt(0, 99999)}${tmpWord}`
};

const hardRandom = (length) => {
  length = length || getRandomInt(6, 14);

  const string = 'abcdefghijklmnopqrstuvwxyz';
  const numeric = '0123456789';
  const punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
  let password = '';
  let character = '';

  while (password.length < length) {
    const entity1 = Math.ceil(string.length * Math.random() * Math.random());
    const entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
    const entity3 = Math.ceil(punctuation.length * Math.random() * Math.random());
    let hold = string.charAt(entity1);
    hold = (password.length % 2 == 0) ? (hold.toUpperCase()) : (hold);
    character += hold;
    character += numeric.charAt(entity2);
    character += punctuation.charAt(entity3);
    password = character;
  }
  password = password.split('').sort(function () {
    return 0.5 - Math.random()
  }).join('');
  return password.substr(0, length);
}

const generate = (quantity) => {
  console.log('Wait, generating...')
  const passQuant = quantity || 100000, passwords = [];

  let popPass = fs.readFileSync('res/pop-pass.txt', 'utf8');
  popPass = popPass.split('\r\n');


  for (let i = 0; i < passQuant; i++) {
    const percent = getRandomInt(1, 100);

    let password;
    if (percent <= 60 && percent >= 1) {
      password = popPass[getRandomInt(0, popPass.length - 1)]
    } else if(percent >= 61 && percent <= 80) {
      password = combNumWords();
    } else if(percent >= 81 && percent <= 95) {
      password = charToNumWithCamel(getRandomInt(0, 1) ? words[getRandomInt(0, words.length - 1)] : names[getRandomInt(0, names.length - 1)]);
    } else {
      password = hardRandom();
    }

    passwords.push(password);
  }

  // console.log('log passwords', passwords)


  fs.writeFileSync('outputs/a_lot_of_pass.txt', passwords.join('\n'));
  console.log('Passwords generated!')
  return passwords;
}

module.exports = {
  getRandomInt,
  hardRandom,
  generate
}

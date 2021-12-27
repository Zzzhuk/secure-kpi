const generator = require('./generator');
const hash = require('./hash');
const {bCrypt} = require('./hash');
const fs = require('fs');

(async () => {

  console.log('Hashes md5 are generating...')
  const hashesMD5 = (() => {
    const passwordsGenerated = generator.generate(), passwords = [];

    for (let i = 0; i < passwordsGenerated.length; i++) {
      const salt = generator.hardRandom(10);
     passwords.push(hash.MD5(passwords[i], salt))
    }
    return passwords
  })();
  console.log('Hashes md5 generated!')
  console.log('Hashes bCrypto are generating...')
  const hashesBCrypto = (() => {
    const passwordsGenerated = generator.generate(100), passwords = [];

    for (let i = 0; i < passwordsGenerated.length; i++) {
      passwords.push(bCrypt(passwordsGenerated[i]))
    }
    return passwords;
  })();

  console.log('Hashes bcrypto generated!')

  fs.writeFileSync('outputs/md5-hashes.csv', hashesMD5.join(','))
  fs.writeFileSync('outputs/bcrypto-hashes.csv', hashesBCrypto.join(','))
  console.log('Hashes written!')
})()


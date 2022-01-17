const crypto = require('crypto');
require('dotenv').config();

const iv = crypto.randomBytes(16);

const encrypt = (data) => {
  if(data?.length === 0 || typeof data === 'undefined' || !data) return data;
  if(data.startsWith('{"iv":')) return data;
  const cipher = crypto.createCipheriv('aes-256-gcm', process.env.AES_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
  return JSON.stringify({
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  });
};

const decrypt = (data) => {
  return new Promise((resolve, reject) => {
    try {
      if(data?.length === 0 || typeof data === 'undefined' || !data) return data;
      if(data.startsWith('{"iv":')) return resolve(data);
      data = JSON.parse(data);
      const decipher = crypto.createDecipheriv('aes-256-gcm', process.env.AES_KEY, Buffer.from(data.iv, 'hex'));
      const decrypted = Buffer.concat([decipher.update(Buffer.from(data.content, 'hex')), decipher.final()]);

      resolve(decrypted.toString());
    } catch (error){
      return reject(error)
    }
  });
};

module.exports = {
  decrypt, encrypt
}

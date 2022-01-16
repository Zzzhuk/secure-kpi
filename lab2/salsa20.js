const {bytesToString, stringToBytes, textPercent, hexToBytes} = require('./utils');
const cipherDecipher = (bytes, key) => {
  const result = [];

  for (let i = 0; i < bytes.length; i++) {
    result[i] = bytes[i] ^ key[i % key.length];
  }

  return result;
};

const analyzer = (textArr, word) => {
  let bestPercent = 0, bestText;

  const arrBytes = textArr.map(hexToBytes);

  for (let i = 0; i < arrBytes.length; i++) {
    const strArr = [];

    for (let j = 0; j < arrBytes.length; j++) {
      let minLength = Math.min(arrBytes[i].length, arrBytes[j].length);

      let fBytesArr = arrBytes[i].slice(0, minLength);
      let sBytesArr = arrBytes[j].slice(0, minLength);

      let xorArr = cipherDecipher(fBytesArr, sBytesArr);
      let wordBytes = stringToBytes(word);
      let resBytes = cipherDecipher(xorArr, wordBytes);
      let resStr = bytesToString(resBytes);
      strArr.push(resStr);
      // console.log(`Res string ${i}, ${j}`, resStr)
    }

    let text = '';
    for(let sIdx = 0; sIdx < strArr.length; sIdx++){
      let strPart = strArr[sIdx];
      const minLength = Math.min(strPart.length, word.length);
      text += strPart.substring(0, minLength) + '\n';
    }

    // console.log('text', text)

    const percent = textPercent(text);
    if(percent > bestPercent){
      bestText = text;
      bestPercent = percent;
    }
  }

  return bestText;
};

module.exports = {
  analyzer,
  cipherDecipher
}

module.exports = {
  bytesToString: (bytes) => {
    return String.fromCharCode(...bytes);
  },
  stringToBytes: (str) => {
    let result = [];
    for (let i = 0; i < str.length; i++) {
      result.push(str.charCodeAt(i));
    }
    return result;
  },
  hexToBytes: (str) => {
    let result = [];
    while (str.length >= 2) {
      result.push(parseInt(str.substring(0, 2), 16));

      str = str.substring(2, str.length);
    }

    return result;
  },
  textPercent: (str) => {
    let n = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i);
      if (/[a-zA-Z,.'"\-:\s]/.test(char))
        n++;
    }

    return n / str.length * 100;
  }
};

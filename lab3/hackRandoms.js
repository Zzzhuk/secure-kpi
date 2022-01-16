const {getA, getC} = require('./utils');
const Lcg = require('./lcg');
const {play} = require('./remoteCasino');

const mod = Math.pow(2, 32);

// const getA = (numArr, mInv) => {
//   console.log('log numArr', numArr)
//   console.log('log numArr[2] - numArr[1]', numArr[2] - numArr[1])
//   console.log('log numArr[1] - numArr[0]', numArr[1] - numArr[0])
//   console.log('mod', mod)
//   console.log('mInv', mInv)
//   return (numArr[2] - numArr[1] * modInverse(numArr)) % mod;
// };
// const getC = (numArr, a) => {
//   return (numArr[1] - numArr[0] * a) % mod;
// }
const hackLcg = async (id) => {
  const realNumbers = [];
  // let mInv = 0;
  // do {
    for (let i = 0; i < 3; i++) {
      const resPlay = await play({mode: 'Lcg', id, bet: 1, number: 0});
      console.log('res Lcg mode test:', resPlay);
      const {realNumber} = resPlay;
      realNumbers.push(realNumber);
      console.log('realNumbers', realNumbers)
    }
  //   mInv = modInverse(realNumbers[1] - realNumbers[0], mod)
  // }  while(!mInv)


  const a = await getA(realNumbers, mod);
  const c = await getC(realNumbers, a, mod);
  console.log(`a = ${a}, c = ${c}`);

  let lcg = new Lcg(realNumbers[realNumbers.length - 1], a, c);

  for (let bet = 1; bet <= 1000000; bet = bet * 1000) {
    const genNext = lcg.next();
    console.log('gen next number:', genNext);
    const resPlay = await play({mode: 'Lcg', id, bet, number: genNext});
    console.log('res Lcg mode:', resPlay);
    lcg = new Lcg(resPlay.realNumber, a, c);
  }
};

module.exports = {
  hackLcg
}

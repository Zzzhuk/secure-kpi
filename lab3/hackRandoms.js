const {getA, getC} = require('./utils');
const Lcg = require('./lcg');
const {MersenneTwister19937} = require('random-js')
const {play} = require('./remoteCasino');
const moment = require('moment');

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

const hackMT = async (id, account) => {
  // const resTestPlay = await play({mode: 'Mt', id, bet: 1, number: 0});
  // const creation_time = moment(resTestPlay.account.deletionTime).subtract(1, 'hour');
  if (account?.id) {
    const creation_time = moment(account.deletionTime).subtract(1, 'hour');
    let timestamp = creation_time.utc().unix();
    console.log('timestamp', timestamp)
    const mt = MersenneTwister19937.seed(timestamp);
    while (account.money < 1000000 && account.money > 0) {
      let genNum = mt.next();
      genNum = genNum < 0 ? genNum * -1 : genNum;
      console.log('log mt gen num', genNum )
      const resPlay = await play({mode: 'Mt', id, bet: 1, number: genNum});
      account.money = resPlay?.account?.money || 0
      console.log('res mt mode test:', resPlay);
      // // console.log('utcOffset', moment().utcOffset(resPlay.account.deletionTime));
    }
  }
};

module.exports = {
  hackLcg, hackMT
}

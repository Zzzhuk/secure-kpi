const fetch = require('node-fetch');

const createAcc = async (accId) => {
  const res = await fetch(`http://95.217.177.249/casino/createacc?id=${accId}`);
  const data = await res.json();
  return data;
};
const play = async ({mode, id, bet, number}) => {
  const res = await fetch(`http://95.217.177.249/casino/play${mode}?id=${id}&bet=${bet}&number=${number}`);
  const data = await res.json();
  return data;
};

module.exports = {
  createAcc, play
}

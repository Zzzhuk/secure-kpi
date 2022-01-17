const {createAcc, play} = require('./remoteCasino');
const {hackLcg, hackMT} = require('./hackRandoms');

const id = 'test';

//
(async () => {
  // await hackLcg(id);
  const account = await createAcc(id);
  await hackMT(id, account);
})()


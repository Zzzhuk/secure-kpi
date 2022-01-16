const {createAcc, play} = require('./remoteCasino');
const {hackLcg} = require('./hackRandoms');

const id = 'zaza';

createAcc(id).then();
//
(async () => {
  await hackLcg(id)
})()


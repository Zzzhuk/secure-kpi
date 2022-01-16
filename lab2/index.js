const {analyzer} = require('./salsa20');
const texts = [
  '280dc9e47f3352c307f6d894ee8d534313429a79c1d8a6021f8a8eabca919cfb685a0d468973625e757490daa981ea6b',
  '3a0a9cab782b4f8603eac28aadde1151005fd46a859df21d12c38eaa858596bf2548000e883d72117466c5c3a580f66b',
  '3a0adee4783a538403b9c29eaac958550242d3778ed9a61918959bf4ca849afa68450f5edc6e311a7f7ed1d7ec',
  '3a0adee461354e8c1cfcc39bef8d5e40525fdc6bc0dee359578290bcca849afa685a1e5c897362',
  '3a0adab0282b5c9719fcc38caac054541b449a62cf9df21d509690af858286f731091a4890786252',
  '390adeaa283358c318f0c08befc157061f59dd65dd9dee1c04c38fad839586ea3b0903489078',
  '390bcfac283a1d8111ebc8d8e8c2554d1b5e852dfed5e955008c8bb48ed094fe3a4d0b45883d731b7b609c',
  '3a0d9ba37a2e539750f8c39caade464313449a78c7d9e3075782deaf8f9180e66845074f9e31',
  '2c17cfe47c335c9750edc59daac9434313549a62cf9df51a1a868ab0839e95bf294f1a4c893d751b7b66d882',
  '3a0adee47d35598a03fac28eefdf54011610d962dcd3f2070ecfdebe989f9fbf3f41015a9e3d73116f60de',
  '200d9bb07a3a4b861cf5c88aaadf54520742d47e859df6000d9992bd99d086f72d09194097713d',
  '2f0cdfe4653a568603b9d88baadf50521a55c82dcbd8e707579796b79995d2f624451d098c7831167b64d5',
  '3a0adaaa283d519a50edc2d8e5d9594300439a79c1dcf2550086deb3849f85bf26461a09947b2e',
  '3a0aceb72838528d03fac49de4ce5406165fce6589d0e71e12c39db79d9180fb3b09014fdb68625e7b7edc82',
  '2f0cdfe47c33489050edc59daac350521b46df2dc1c8e3551885deaa8f839df33d5d074695',
  '27119bb76138568f19fcc9d8e58a54545247d379c19df21d12c38eb98695d2fc295a1a09947b310a727dc5c9a898a3',
  '2f0cdfe46d35498602e9df91f9c842061d569a6adbd8e701579397ac82d093f12c09034696787f0a',
  '390bcfac282f558a03b9df9dedcc43425244d268c0cfa61602918cbd848481bf3c5c1c47db7c660c63',
  '2f0cdfe464344e8650edc59daac3504b1710d56b89dce5011e8c90f6'
];

//Trying The
let word = 'The ';
word = 'With ';
word = 'But the '; // nope
word = 'But then '; //nope
word = 'But that ';
word = 'No travel '; //nope
word = 'And makes ';
word = 'Is sicklied ';
word = 'No traveller ';
word = 'For who would '; //check
word = 'When he himself ';

const key = 'For who would bear the whips and scorns of time';

const res = analyzer(texts, key);

console.log(`Result with ${key}\n`, res);

// For who would bear the whips and scorns of time
// Th'oppressor's wrong, the proud man's contumely
// The pangs of dispriz'd love, the law's delay,
// The insolence of office, and the spurns
// That patient merit of th'unworthy takes,
// When he himself might his quietus make
// With a bare bodkin? Who would fardels bear,
// To grunt and sweat under a weary life,
// But that the dread of something after death,
// The undiscovere'd country, from whose bourn
// No traveller returns, puzzles the will,
// And makes us rather bear those ills we have
// Than fly to others that we know not of?
// Thus conscience doth make cowards of us all,
// And thus the native hue of resolution
// Is sicklied o'er with the pale cast of thought,
// And enterprises of great pith and moment
// With this regard their currents turn awry
// And lose the name of action.


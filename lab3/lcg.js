class Lcg {
  constructor(seed, a, c) {
    this.seed = seed;
    this.a = a;
    this.c = c;
    this.mod = Math.pow(2, 32);
  }

  next(){
    console.log('a, seed, c, mod', this.a, this.seed, this.c, this.mod)
    let res = (this.a * this.seed + this.c) % this.mod;
    return res;
  }
}

module.exports = Lcg;

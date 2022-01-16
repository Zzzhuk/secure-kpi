class Lcg {
  constructor(seed, a, c) {
    this.seed = seed;
    this.a = a;
    this.c = c;
    this.mod = Math.pow(2, 32);
  }

  next(){
    let res = (this.a * this.seed + this.c) % this.mod;
    return res;
  }
}

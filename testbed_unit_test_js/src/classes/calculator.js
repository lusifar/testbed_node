class Calculator {
  constructor(offset) {
    this.offset = offset;
  }

  add(x, y) {
    return x + y + this.offset;
  }

  async addAsync(x, y) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.add(x, y));
      }, 1000);
    });
  }

  substract(x, y) {
    return x - y + this.offset;
  }

  async substractAsync(x, y) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.substract(x, y));
      }, 1000);
    });
  }
}

module.exports = Calculator;

export class Calculator {
  private offset: number;

  constructor(offset: number) {
    this.offset = offset;
  }

  add(x: number, y: number) {
    return x + y + this.offset;
  }

  async addAsync(x: number, y: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.add(x, y));
      }, 1000);
    });
  }

  substract(x: number, y: number) {
    return x - y + this.offset;
  }

  async substractAsync(x: number, y: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.substract(x, y));
      }, 1000);
    });
  }
}

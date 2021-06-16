const multiply = require('../multiply');

jest.mock('../multiply');

describe('Method multiply', () => {
  beforeEach(() => {
    multiply.mockClear();
  });

  //   it('test the multiply method in automatical mode', async () => {
  //     multiply.mockImplementation((x, y) => {
  //       console.log('automatical mock multiply');

  //       return x * y + 10;
  //     });

  //     const res = multiply(3, 4);
  //     expect(res).toBe(22);
  //   });

  it('test the multiply method in manual mode', async () => {
    const res = multiply(5, 6);
    expect(res).toBe(30);
  });
});

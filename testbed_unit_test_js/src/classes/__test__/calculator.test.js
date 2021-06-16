const Calculator = require('../calculator');

jest.mock('../calculator');

describe('Class Calculator', () => {
  const offset = 10;
  const cal = new Calculator(offset);

  beforeEach(() => {
    Calculator.mockClear();
  });

  it('test the add method', async () => {
    cal.add = jest.fn().mockImplementation((x, y) => {
      return x + y;
    });

    const res = cal.add(1, 2);
    expect(res).toBe(3);
  });

  it('test the addAsync method', async () => {
    cal.addAsync = jest.fn().mockResolvedValue(3);

    const res = await cal.addAsync(2, 4);
    expect(res).toBe(3);
  });

  it('test the substract method', async () => {
    const res = cal.substract(1, 2);
    expect(res).toBe(-1);
  });

  it('test the substractAsync method', async () => {
    const res = await cal.substractAsync(6, 4);
    expect(res).toBe(2);
  });
});

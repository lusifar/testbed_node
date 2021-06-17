import { multiply } from '../multiply';

jest.mock('../multiply');

describe('Method multiply', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('test the multiply method in manual mode', async () => {
    const res = multiply(5, 6);
    expect(res).toBe(30);
  });
});

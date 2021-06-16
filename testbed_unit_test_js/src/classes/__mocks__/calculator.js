module.exports = jest.fn().mockImplementation(() => {
  return {
    substract: jest.fn().mockImplementation((x, y) => {
      console.log('manual mock substract');

      return x - y;
    }),

    substractAsync: jest.fn().mockImplementation((x, y) => {
      console.log('manual mock substractAsync');

      return Promise.resolve(x - y);
    }),
  };
});

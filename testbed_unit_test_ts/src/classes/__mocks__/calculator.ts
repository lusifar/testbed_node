const Calculator = jest.fn().mockImplementation(() => {
  return {
    substract: jest.fn().mockImplementation((x: number, y: number) => {
      console.log('manual mock substract');

      return x - y;
    }),

    substractAsync: jest.fn().mockImplementation((x: number, y: number) => {
      console.log('manual mock substractAsync');

      return Promise.resolve(x - y);
    }),
  };
});

export { Calculator };

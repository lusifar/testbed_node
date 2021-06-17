const multiply = jest.fn().mockImplementation((x: number, y: number) => {
  console.log('manual mock multiply method');

  return x * y;
});

export { multiply };
